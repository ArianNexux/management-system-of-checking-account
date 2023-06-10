import Employee from "../domain/employee.entity";

type ListEmployeeInputDTO = {
    limit: number;
    page: number;
};
export default interface EmployeeGateway {
    add(entity: Employee): Promise<void>;
    update(entity: Employee): Promise<void>;
    find(id: string): Promise<Employee>;
    delete(id: string): Promise<void>;
    list(input: ListEmployeeInputDTO): Promise<Employee[]>;
}
