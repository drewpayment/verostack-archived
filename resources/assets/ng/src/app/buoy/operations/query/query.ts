import { scope } from 'ngx-plumber';
import { Buoy } from '../../buoy';
import { QueryResult } from './query-result';
import { QueryError } from './query-error';
import { Operation } from '../operation';
import { QueryOptions } from './query-options';
import { Observable } from 'apollo-link';
import { Observer } from 'apollo-client/util/Observable';

export class Query extends Operation {
    public data: any;

    public loading = true;

    constructor(
        buoy: Buoy,
        id: number,
        query,
        variables,
        options: QueryOptions
    ) {
        super(buoy, id, query, variables, options, 'query');

        return this;
    }

    /**
     * Execute the query and return an observable.
     */
    public execute<T = any>(): Observable<QueryResult<T>|QueryError> {
        return new Observable((ob: Observer<QueryResult<T> | QueryError>) => {
            this._buoy.apollo.query({
                query: this.getQuery(),
                variables: this.getVariables(),
                errorPolicy: 'all',
                fetchResults: true
            }).toPromise().then(
                (response) => {
                if (typeof response.errors === 'undefined') {
                    response.errors = [];
                }

                for (const error of response.errors) {
                    if (error.extensions.category === 'graphql') {
                        throw new Error(
                            '[Buoy :: GraphQL error]: ${error.message}, on line ' +
                            `${error.locations[0].line}:${error.locations[0].column}.`,
                        );
                    }
                }

                if (response.errors.length === 0) {
                    ob.next(new QueryResult<T>(this.mapResponse(response)));
                } else {
                    ob.next(new QueryError(response.data ? response.data : null, ''));
                }

                ob.complete();
            },
            (error) => {
                throw new Error(error);
                
                ob.next(new QueryError(
                    null,
                    {
                        // graphQl: error.graphQLErrors,
                        // network: error.networkError,
                        data: {},
                        extensions: {}
                    }
                ));
                ob.complete();
            });
        });
    }

    private mapResponse(data): any {
        return scope(data.data, this._options.scope);
    }
}
