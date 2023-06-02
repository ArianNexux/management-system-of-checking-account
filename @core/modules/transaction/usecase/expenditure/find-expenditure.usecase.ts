import { FindExpenditureInputDTO, FindExpenditureOutputDTO } from "../../../@shared/dtos/find-expenditure.dto";
import ExpenditureGateway from "../../gateway/expenditure.gateway";

export default class FindExpenditureUseCase {

    constructor(
        private repository: ExpenditureGateway
    ) {

    }

    async execute(input: FindExpenditureInputDTO): Promise<FindExpenditureOutputDTO> {
        if (input.id == "") {
            throw new Error("Please provide an id to find the expenditure")
        }
        const expenditureFound = await this.repository.find(input.id)

        if (!expenditureFound) {
            throw new Error("Expenditure not found")
        }

        return {
            id: input.id,
            name: expenditureFound.name,
            type: expenditureFound.type,
        }
    }

}