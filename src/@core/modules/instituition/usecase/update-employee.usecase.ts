import Id from "../../@shared/domain/value-objects/id.vo";
import EmployeeGateway from "../gateway/employee.gateway";
import Employee from "../domain/employee.entity";
import Name from "../../../modules/@shared/domain/value-objects/name.vo";
import Email from "../../../modules/@shared/domain/value-objects/email.vo";
import Encryptor from "../contracts/encryptor.interface";

export default class UpdateEmployeeUseCase {
    constructor(
        private repository: EmployeeGateway,
        private encryptor: Encryptor
    ) {

    }


    async execute(input: UpdateEmployeeInputDTO): Promise<UpdateEmployeeOutputDTO> {
        const encryptedPassword = await this.encryptor.execute(input.password)
        const employeeProps = {
            id: new Id(input.id),
            name: new Name(input.name),
            email: new Email(input.email),
            role: input.role,
            position: input.position,
            photo: input.photo,
            password: encryptedPassword

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