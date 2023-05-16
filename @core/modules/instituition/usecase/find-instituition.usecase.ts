import { FindInstituitionInputDTO, FindInstituitionOutputDTO } from "../../@shared/dtos/find-instituition.dto";
import InstituitionGateway from "../gateway/instituition.gateway";

export default class FindInstituitionUseCase {

    constructor(
        private repository: InstituitionGateway
    ) {

    }

    async execute(input: FindInstituitionInputDTO): Promise<FindInstituitionOutputDTO> {
        if (input.id == "") {
            throw new Error("Please provide an id to find the instituition")
        }
        const instituitionFound = await this.repository.find(input.id)

        if (!instituitionFound) {
            throw new Error("Instituition not found")
        }

        return {
            id: input.id,
            name: instituitionFound.name,
            title1: instituitionFound.title1,
            title2: instituitionFound.title2,
            logo: instituitionFound.logo,
            widthLogo: instituitionFound.sizeLogo.width,
            heightLogo: instituitionFound.sizeLogo.width,
        }
    }

}