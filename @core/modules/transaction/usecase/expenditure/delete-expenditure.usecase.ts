import ExpenditureGateway from "../../gateway/expenditure.gateway";

export default class DeleteExpenditureUseCase {
    constructor(
        private repository: ExpenditureGateway
    ) {

    }


    async execute(input: DeleteExpenditureInputDTO): Promise<DeleteExpenditureOutputDTO> {
        await this.repository.delete(input.id)
        return {

        }
    }
}