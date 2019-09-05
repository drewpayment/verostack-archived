import { BuoyConfig } from './buoy-config';
import { Injectable, Optional } from '@angular/core';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { SubscriptionOptions } from 'apollo-client';
import { Subscription } from './operations/subscription/subscription';
import { LighthouseLink } from './http-link/lighthouse-link';
import { QueryOptions } from './operations/query/query-options';
import { QueryResult } from './operations/query/query-result';
import { QueryError } from './operations/query/query-error';
import { Query } from './operations/query/query';
import { WatchQuery } from './operations/watch-query/watch-query';
import { WatchQueryOptions } from './operations/watch-query/watch-query-options';
import { MutationOptions } from './operations/mutation/mutation-options';
import { MutationResult } from './operations/mutation/mutation-result';
import { MutationError } from './operations/mutation/mutation-error';
import { Mutation } from './operations/mutation/mutation';
import { Observable as ApolloObservable } from 'apollo-client/util/Observable';



let operationId = 1;

@Injectable({
    providedIn: 'root'
})
export class Buoy {
    _config: BuoyConfig;
    _middleware = [];

    cache: InMemoryCache;

    constructor(
        @Optional() config: BuoyConfig,
        public apollo: Apollo,
        public http: HttpClient
    ) {
        this._config = Object.assign(new BuoyConfig(), config);

        if (typeof this._config.middleware !== 'undefined') {
            for (const middleware of this._config.middleware) {
                this.registerMiddleware(middleware, []);
            }
        }

        this.cache = new InMemoryCache();

        this.apollo.create({
            link: new LighthouseLink(this),
            cache: this.cache
        });
    }

    /**
     * Run a query.
     */
    public query<T>(params: QueryParams): ApolloObservable<QueryResult<T>|QueryError> {
        return new Query(this, operationId++, params.query, params.variables, params.options).execute<T>();
    }

    /**
     * Run an asynchronous query, that can be subscribed to.
     */
    public watchQuery(query, variables?: any, options?: WatchQueryOptions): WatchQuery {
        return new WatchQuery(this, operationId++, query, variables, options);
    }

    /**
     * Run a mutation.
     */
    // public mutate<T>(mutation, variables?: any, options?: MutationOptions): ApolloObservable<MutationResult<T>|MutationError> {
    //     return new Mutation(this, operationId++, mutation, variables, options).execute<T>();
    // }

    public mutate<T>(params: MutationParams): ApolloObservable<MutationResult<T> | MutationError> {
        return new Mutation(this, operationId++, params.mutation, params.variables, params.options).execute<T>();
    }

    /**
     * Subscribe to changes server-side.
     */
    public subscribe(subscription, variables?: any, options?: SubscriptionOptions): Subscription {
        return new Subscription(subscription, variables, options);
    }

    public get config(): BuoyConfig {
        return this._config;
    }

    public registerMiddleware(middleware: any, args: any[]): void {
        this._middleware.push(new middleware(args));
    }

    /**
     * Reset the Buoy cache.
     */
    public resetCache(): void {
        this.cache.reset();
    }
}

export interface MutationParams {
    mutation: string,
    variables?: { [key: string]: any },
    options?: MutationOptions
}

export interface QueryParams {
    query: string,
    variables?: { [key: string]: any },
    options?: QueryOptions
}
