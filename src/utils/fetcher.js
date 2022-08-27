export const fetcher = (asyncFn, params) => {
    return () => asyncFn(params)
}