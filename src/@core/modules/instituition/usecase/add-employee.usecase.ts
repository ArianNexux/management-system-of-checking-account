import Id from "../../@shared/domain/value-objects/id.vo";
import { AddEmployeeInputDTO, AddEmployeeOutputDTO } from "../../@shared/dtos/add-employee.dto";
import EmployeeGateway from "../../../modules/instituition/gateway/employee.gateway";
import Employee from "../domain/employee.entity";
import Name from "../../@shared/domain/value-objects/name.vo";
import Email from "../../@shared/domain/value-objects/email.vo";
import InvalidDTOProvided from "../errors/invalid-dto-provided";
import Encryptor from "../contracts/encryptor.interface";

export default class AddEmployeeUseCase {

    constructor(
        private repository: EmployeeGateway,
        private encryptor: Encryptor
    ) {

    }

    async execute(input: AddEmployeeInputDTO): Promise<AddEmployeeOutputDTO> {
        if (!input) {
            throw new InvalidDTOProvided()
        }
        const encryptedPassword = await this.encryptor.execute(input.password)
        const propsEmployee = {
            id: new Id(),
            name: new Name(input.name),
            email: new Email(input.email),
            role: input.role,
            position: input.position,
            photo: input.photo,
            password: encryptedPassword
        }

        const employee = new Employee(propsEmployee)

        await this.repository.add(employee)


        return {
            id: employee.id.value,
            name: employee.name.value,
            role: employee.role,
            position: employee.position,
            email: employee.email.value,
            photo: employee.photo

        }

    }
}