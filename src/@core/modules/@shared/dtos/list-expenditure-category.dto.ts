
type ListExpenditureCategoryOutputDTO = {
    data: ListExpenditureCategory[],
    page: number,
    limit: number
}

type ListExpenditureCategory = {
    id: string,
    name: string,
}

type ListExpenditureCategoryInputDTO = {
    page: number,
    limit: number
}