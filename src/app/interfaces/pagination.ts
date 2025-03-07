export interface Pagination {
  total: number,
  perPage: number,
  currentPage: number,
  lastPage: number,
  firstPage: number,
  firstPageUrl: string,
  lastPageUrl: string,
  nextPageUrl: string,
  previousPageUrl: string | null
}
