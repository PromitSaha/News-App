const Pagination = {
    ItemPerPage: 5,
    FirstPageNo: 1
}

const ResponseStatus = {
    success: "ok",
    Failure: "error"
}

const ArticleCategories = [
    {
        key: "business",
        value: "Business"
    },
    {
        key: "entertainment",
        value: "Entertainment"
    },
    {
        key: "general",
        value: "General"
    },
    {
        key: "health",
        value: "Health"
    },
    {
        key: "science",
        value: "Science"
    },
    {
        key: "sports",
        value: "Sports"
    },
    {
        key: "technology",
        value: "Technology"
    },
]

module.exports = {
    Paginatio: Pagination,
    ResponseStatus: ResponseStatus,
    ArticleCategories: ArticleCategories
};