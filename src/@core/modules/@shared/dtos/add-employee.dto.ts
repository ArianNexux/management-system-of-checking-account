export type AddEmployeeInputDTO = {
    name: string;
    email: string;
    photo: string;
    role: string;
    position: string;
    password: string;

}

export type AddEmployeeOutputDTO = {
    id: string
    name: string;
    email: string;
    photo: string;
    role: string;
    position: string;
}