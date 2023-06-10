import EmployeeGateway from "../gateway/employee.gateway";

export default class DeleteEmployeeUseCase {
    constructor(
        private repository: EmployeeGateway
    ) {

    }


    async execute(input: DeleteEmployeeInputDTO): Promise<DeleteEmployeeOutputDTO> {
        await this.repository.delete(input.id)
        return {

        }
    }
}