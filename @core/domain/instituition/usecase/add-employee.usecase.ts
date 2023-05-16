import Id from "../../../@shared/value-objects/id.vo";
import { AddEmployeeInputDTO, AddEmployeeOutputDTO } from "../../../@shared/dtos/add-employee.dto";
import EmployeeGateway from "../gateway/employee.gateway";
import Employee from "../entities/employee.entity";
import Name from "../../../@shared/value-objects/name.vo";
import Email from "../../../@shared/value-objects/email.vo";

export default class AddEmployeeUseCase {

    constructor(
        private repository: EmployeeGateway
    ) {

    }

    async execute(input: AddEmployeeInputDTO): Promise<AddEmployeeOutputDTO> {
        if (!input) {
            throw new Error("Input DTO was not provided")
        }

        const propsEmployee = {
            id: new Id(),
            name: new Name(input.name),
            email: new Email(input.email),
            role: input.role,
            position: input.position,
            photo: input.photo
        }

        const employee = new Employee(propsEmployee)

        await this.repository.add(employee)


        return {
            id: employee.id.id,
            name: employee.name.name,
            role: employee.role,
            position: employee.position,
            email: employee.email.email,
            photo: employee.photo

        }

    }
}