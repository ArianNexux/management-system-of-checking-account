
type ListEmployeeOutputDTO = {
    data: ListEmployee[]
    page: number
    limit: number
}
type ListEmployee = {
    id: string,
    name: string;
    email: string;
    photo: string;
    role: string;
    position: string;
}
type ListEmployeeInputDTO = {
    page: number
    limit: number
}