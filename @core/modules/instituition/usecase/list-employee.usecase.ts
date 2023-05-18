import Id from "../../@shared/domain/value-objects/id.vo";
import EmployeeGateway from "../gateway/Employee.gateway";
import Employee from "../domain/employee.entity";
import Name from "../../@shared/domain/value-objects/name.vo";
import Email from "../../@shared/domain/value-objects/email.vo";

export default class ListEmployeeUseCase {
    constructor(
        private repository: EmployeeGateway
    ) {

    }


    async execute(input: ListEmployeeInputDTO): Promise<ListEmployeeOutputDTO> {

        let result = await this.repository.list(input)

        if (!result) {
            throw new Error("No result found for employees")
        }

        let output: ListEmployee[] = result.map(e => ({
            id: e.id.id,
            name: e.name.name,
            email: e.email.email,
            position: e.position,
            role: e.role,
            photo: e.photo
        }))

        return {
            data: output,
            page: input.page,
            limit: input.limit
        }
    }
}