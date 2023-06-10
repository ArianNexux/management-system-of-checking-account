import Id from "../../@shared/domain/value-objects/id.vo";
import EmployeeGateway from "../gateway/employee.gateway";
import Employee from "../domain/employee.entity";
import Name from "../../@shared/domain/value-objects/name.vo";
import Email from "../../@shared/domain/value-objects/email.vo";
import EmployeeNotFound from "../errors/employee-not-found";

export default class ListEmployeeUseCase {
    constructor(
        private repository: EmployeeGateway
    ) {

    }


    async execute(input: ListEmployeeInputDTO): Promise<ListEmployeeOutputDTO> {

        let result = await this.repository.list(input)

        if (!result) {
            throw new EmployeeNotFound("No result found for employees")
        }

        let output: ListEmployee[] = result.map(e => ({
            id: e.id.value,
            name: e.name.value,
            email: e.email.value,
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