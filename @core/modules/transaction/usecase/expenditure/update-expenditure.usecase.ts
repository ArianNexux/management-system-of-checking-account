import Id from "../../../@shared/domain/value-objects/id.vo";
import ExpenditureGateway from "../../gateway/Expenditure.gateway";
import Expenditure from "../../domain/expenditure.entity";

export default class UpdateExpenditureUseCase {
    constructor(
        private repository: ExpenditureGateway
    ) {

    }


    async execute(input: UpdateExpenditureInputDTO): Promise<UpdateExpenditureOutputDTO> {
        const expenditureProps = {
            id: new Id(input.id),
            name: input.name,
            type: input.type
        }

        const expenditure = new Expenditure(expenditureProps)

        await this.repository.update(expenditure)

        return {
            id: input.id,
            name: input.name,
            type: input.type,
        }
    }
}