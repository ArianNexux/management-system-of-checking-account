import Id from "../../../@shared/domain/value-objects/id.vo";
import { AddExpenditureInputDTO, AddExpenditureOutputDTO } from "../../../@shared/dtos/add-expenditure.dto";
import ExpenditureGateway from "../../gateway/expenditure.gateway";
import Expenditure from "../../domain/expenditure.entity";

export default class AddExpenditureUseCase {

    constructor(
        private repository: ExpenditureGateway
    ) {

    }

    async execute(input: AddExpenditureInputDTO): Promise<AddExpenditureOutputDTO> {
        if (!input) {
            throw new Error("Input DTO was not provided")
        }
        const propsExpenditure = {
            id: new Id(),
            name: input.name,
            type: input.type,
        }
        const expenditure = new Expenditure(propsExpenditure)
        await this.repository.add(expenditure)
        return {
            id: expenditure.id.value,
            name: expenditure.name,
            type: expenditure.type,
        }
    }
}