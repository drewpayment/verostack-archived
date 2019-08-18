
export interface Graphql<T> {
    data: {
        [key:string]: T
    }
}
