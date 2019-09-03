
export class QueryResult<T> {

    /**
     * Contains the result of the query.
     */
    data: {
        [key: string]: T
    };

    constructor(data: {[key: string]: T}) {
        this.data = data;
    }

}
