import { Operation } from '../operation';
import { Buoy } from '@app/buoy/buoy';
import { MutationOptions } from './mutation-options';
import { MutationResult } from './mutation-result';
import { MutationError } from './mutation-error';
import { scope } from 'ngx-plumber';
import { Observable as ApolloObservable } from 'apollo-link';
import { Observer } from 'apollo-client/util/Observable';

export class Mutation extends Operation {
    constructor(
        buoy: Buoy,
        id: number,
        query,
        variables,
        options: MutationOptions
    ) {
        super(buoy, id, query, variables, options, 'mutation');
    }

    public execute<T>(): ApolloObservable<MutationResult<T>|MutationError> {
        return new ApolloObservable<MutationResult<T>|MutationError>((ob: Observer<MutationResult<T>|MutationError>) => {
            // TODO Implement Optimistic UI (#16)

            this._buoy.apollo.mutate<T>({
                mutation: this.getQuery(),
                variables: this.getVariables(),
                errorPolicy: 'all'
            }).toPromise().then(
                (response) => {

                    if (typeof response.errors === 'undefined') {
                        response['errors'] = [];
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
                        ob.next(new MutationResult(this.mapResponse(response)));
                    } else {
                        ob.next(new MutationError(
                            response.data ? response.data : null,
                            response.extensions
                        ));
                    }
                    ob.complete();
                },
                (error) => {
                    ob.next(new MutationError(
                        null,
                        error
                    ));
                    ob.complete();
                }
            );
        });
    }

    private mapResponse(data): any {
        return scope(data.data, this._options.scope);
    }
}
