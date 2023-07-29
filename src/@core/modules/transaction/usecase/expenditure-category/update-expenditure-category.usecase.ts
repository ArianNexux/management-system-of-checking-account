import Id from "../../../@shared/domain/value-objects/id.vo";
import ExpenditureCategoryGateway from "../../gateway/expenditure-category.gateway";
import ExpenditureCategory from "../../domain/expenditure-category.entity";

export default class UpdateExpenditureCategoryUseCase {
    constructor(
        private repository: ExpenditureCategoryGateway
    ) {

    }


    async execute(input: UpdateExpenditureCategoryInputDTO): Promise<UpdateExpenditureCategoryOutputDTO> {
        const expenditureProps = {
            id: new Id(input.id),
            name: input.name,
        }

        const expenditure = new ExpenditureCategory(expenditureProps)

        await this.repository.update(expenditure)

        return {
            id: input.id,
            name: input.name
        }
    }
}