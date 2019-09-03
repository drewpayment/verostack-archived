import { HttpHeaders } from '@angular/common/http';
import { Options as ApolloOptions } from 'apollo-angular-link-http-common';

export declare type LighthouseLinkOptions = {
    uri?: string;

    httpMode?: 'get' | 'json' | 'multipart' | 'opportunistic';

    fileUploads?: false | 'inline' | 'inlineWithMetaData';

    headers?: () => HttpHeaders;

    subscriptions?: {
        driver: 'pusher',
        driverOptions?: ''
    } | false;
} & ApolloOptions;

export declare type Options = LighthouseLinkOptions & ApolloOptions;
export declare type Context = LighthouseLinkOptions & ApolloOptions;
