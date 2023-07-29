
type ListExpenditureOutputDTO = {
    data: ListExpenditure[],
    page: number,
    limit: number,

}

type ListExpenditure = {
    id: string,
    name: string,
    typeOfExpenditure: string
}

type ListExpenditureInputDTO = {
    page: number,
    limit: number,
    typeOfExpenditure?: string

}