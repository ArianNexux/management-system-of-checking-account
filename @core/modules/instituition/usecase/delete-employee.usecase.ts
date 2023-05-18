import EmployeeGateway from "../gateway/Employee.gateway";

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