import ExpenditureCategoryGateway from "../../gateway/expenditure-category.gateway";

export default class ListExpenditureUseCase {
    constructor(
        private repository: ExpenditureCategoryGateway
    ) {

    }


    async execute(input: ListExpenditureCategoryInputDTO): Promise<ListExpenditureCategoryOutputDTO> {

        let result = await this.repository.list(input)

        if (!result) {
            throw new Error("No result found for expenditures")
        }

        let output: ListExpenditureCategory[] = result.map(e => ({
            id: e.id.value,
            name: e.name,
        }))

        return {
            data: output,
            page: input.page,
            limit: input.limit
        }
    }
}