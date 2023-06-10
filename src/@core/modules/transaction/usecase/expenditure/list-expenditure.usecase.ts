import ExpenditureGateway from "../../gateway/expenditure.gateway";

export default class ListExpenditureUseCase {
    constructor(
        private repository: ExpenditureGateway
    ) {

    }


    async execute(input: ListExpenditureInputDTO): Promise<ListExpenditureOutputDTO> {

        let result = await this.repository.list(input)

        if (!result) {
            throw new Error("No result found for expenditures")
        }

        let output: ListExpenditure[] = result.map(e => ({
            id: e.id.value,
            name: e.name,
            type: e.type,
        }))

        return {
            data: output,
            page: input.page,
            limit: input.limit
        }
    }
}