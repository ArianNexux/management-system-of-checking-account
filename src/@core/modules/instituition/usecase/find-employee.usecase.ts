import { FindEmployeeInputDTO, FindEmployeeOutputDTO } from "../../@shared/dtos/find-employee.dto";
import EmployeeNotFound from "../errors/employee-not-found";
import InvalidDTOProvided from "../errors/invalid-dto-provided";
import EmployeeGateway from "../gateway/employee.gateway";

export default class FindEmployeeUseCase {

    constructor(
        private repository: EmployeeGateway
    ) {

    }

    async execute(input: FindEmployeeInputDTO): Promise<FindEmployeeOutputDTO> {
        if (input.id == "") {
            throw new InvalidDTOProvided()
        }
        const employeeFound = await this.repository.find(input.id)

        if (!employeeFound) {
            throw new EmployeeNotFound("Employee not found")
        }

        return {
            id: input.id,
            name: employeeFound.name.value,
            email: employeeFound.email.value,
            photo: employeeFound.photo,
            role: employeeFound.role,
            position: employeeFound.position,
            password: employeeFound.password
        }
    }

}