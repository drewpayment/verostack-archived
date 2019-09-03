export class MutationResult<T> {

    /**
     * Contains the result of the mutation.
     */
    public data: T;

    constructor(data: T) {
        this.data = data;
    }

}
