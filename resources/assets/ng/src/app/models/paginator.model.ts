
export interface Paginator<T> {
    currentPage:number,
    data:T[],
    firstPageUrl:string,
    from:number,
    lastPage:number,
    lastPageUrl:string,
    path:string,
    perPage:number,
    to:number,
    total:number
}