import { SubscriptionDriver } from './subscription-driver';
import { Observable } from 'apollo-link';



export class Pusher extends SubscriptionDriver {
    pusher;

    constructor() {
        super();
    }

    request(operation, forward) {
        return new Observable(ob => {
            forward(operation).subscribe({
                next: data => {
                    // If the operation has the subscription extension, it's a subscription
                    const subscriptionChannel = this._getChannel(
                        data,
                        operation
                    );

                    if (subscriptionChannel) {
                        this._createSubscription(subscriptionChannel, ob);
                    } else {
                        // No subscription found in the response, pipe data through
                        ob.next(data);
                        ob.complete();
                    }
                }
            });
        });
    }

    _getChannel(data, operation) {
        return !!data.extensions &&
        !!data.extensions.lighthouse_subscriptions &&
        !!data.extensions.lighthouse_subscriptions.channels
            ? data.extensions.lighthouse_subscriptions.channels[
                operation.operationName
                ]
            : null;
    }

    _createSubscription(subscriptionChannel, observer) {
        const pusherChannel = this.pusher.subscribe(subscriptionChannel);
        // Subscribe for more update
        pusherChannel.bind('lighthouse-subscription', payload => {
            if (!payload.more) {
                // This is the end, the server says to unsubscribe
                this.pusher.unsubscribe(subscriptionChannel);
                observer.complete();
            }
            const result = payload.result;
            if (result) {
                // Send the new response to listeners
                observer.next(result);
            }
        });
    }
}

export default Pusher;
