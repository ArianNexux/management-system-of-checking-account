import Id from "../../../@shared/domain/value-objects/id.vo";
import { AddExpenditureCategoryInputDTO, AddExpenditureCategoryOutputDTO } from "../../../@shared/dtos/add-expenditure-category.dto";
import ExpenditureCategoryGateway from "../../gateway/expenditure-category.gateway";
import ExpenditureCategory from "../../domain/expenditure-category.entity";

export default class AddExpenditureCategoryUseCase {

    constructor(
        private repository: ExpenditureCategoryGateway
    ) {

    }

    async execute(input: AddExpenditureCategoryInputDTO): Promise<AddExpenditureCategoryOutputDTO> {
        if (!input) {
            throw new Error("Input DTO was not provided")
        }
        const propsExpenditureCategory = {
            id: new Id(),
            name: input.name,
        }
        const expenditureCategory = new ExpenditureCategory(propsExpenditureCategory)
        await this.repository.add(expenditureCategory)

        return {
            id: expenditureCategory.id.value,
            name: expenditureCategory.name,
        }
    }
}