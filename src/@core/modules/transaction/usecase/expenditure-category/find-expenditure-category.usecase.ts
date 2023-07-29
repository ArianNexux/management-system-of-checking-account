import { FindExpenditureCategoryInputDTO, FindExpenditureCategoryOutputDTO } from "../../../@shared/dtos/find-expenditure-category.dto";
import ExpenditureCategoryGateway from "../../gateway/expenditure-category.gateway";

export default class FindExpenditureCategoryUseCase {

    constructor(
        private repository: ExpenditureCategoryGateway
    ) {

    }

    async execute(input: FindExpenditureCategoryInputDTO): Promise<FindExpenditureCategoryOutputDTO> {
        if (input.id == "") {
            throw new Error("Please provide an id to find the expenditureCategory")
        }
        const expenditureCategoryFound = await this.repository.find(input.id)

        if (!expenditureCategoryFound) {
            throw new Error("ExpenditureCategory not found")
        }

        return {
            id: input.id,
            name: expenditureCategoryFound.name,
        }
    }

}