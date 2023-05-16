import Id from "../../@shared/domain/value-objects/id.vo";
import EmployeeGateway from "../gateway/Employee.gateway";
import Employee from "../domain/employee.entity";
import Name from "../../../modules/@shared/domain/value-objects/name.vo";
import Email from "../../../modules/@shared/domain/value-objects/email.vo";

export default class UpdateEmployeeUseCase {
    constructor(
        private repository: EmployeeGateway
    ) {

    }


    async execute(input: UpdateEmployeeInputDTO): Promise<UpdateEmployeeOutputDTO> {
        const employeeProps = {
            id: new Id(input.id),
            name: new Name(input.name),
            email: new Email(input.email),
            role: input.role,
            position: input.position,
            photo: input.photo,
        }

        const employee = new Employee(employeeProps)

        await this.repository.update(employee)

        return {
            id: input.id,
            name: input.name,
            email: input.email,
            role: input.role,
            position: input.position,
            photo: input.photo,
        }
    }
}