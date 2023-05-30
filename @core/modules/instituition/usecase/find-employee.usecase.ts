import { FindEmployeeInputDTO, FindEmployeeOutputDTO } from "../../@shared/dtos/find-employee.dto";
import EmployeeGateway from "../gateway/employee.gateway";

export default class FindEmployeeUseCase {

    constructor(
        private repository: EmployeeGateway
    ) {

    }

    async execute(input: FindEmployeeInputDTO): Promise<FindEmployeeOutputDTO> {
        if (input.id == "") {
            throw new Error("Please provide an id to find the instituition")
        }
        const instituitionFound = await this.repository.find(input.id)

        if (!instituitionFound) {
            throw new Error("Instituition not found")
        }

        return {
            id: input.id,
            name: instituitionFound.name.value,
            email: instituitionFound.email.value,
            photo: instituitionFound.photo,
            role: instituitionFound.role,
            position: instituitionFound.position,
        }
    }

}