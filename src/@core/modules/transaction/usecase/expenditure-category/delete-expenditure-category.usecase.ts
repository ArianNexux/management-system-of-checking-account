import ExpenditureCategoryGateway from "../../gateway/expenditure-category.gateway"

export default class DeleteCategoryUseCase {
    constructor(
        private repository: ExpenditureCategoryGateway
    ) {

    }


    async execute(input: DeleteExpenditureCategoryInputDTO): Promise<DeleteExpenditureCategoryOutputDTO> {
        await this.repository.delete(input.id)
        return {

        }
    }
}