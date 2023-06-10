
type ListExpenditureOutputDTO = {
    data: ListExpenditure[],
    page: number,
    limit: number
}

type ListExpenditure = {
    id: string,
    name: string,
    type: string
}

type ListExpenditureInputDTO = {
    page: number,
    limit: number
}