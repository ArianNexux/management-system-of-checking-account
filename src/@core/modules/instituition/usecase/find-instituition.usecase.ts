import { FindInstituitionInputDTO, FindInstituitionOutputDTO } from "../../@shared/dtos/find-instituition.dto";
import InstituitionNotFound from "../errors/instituition-not-found";
import InvalidDTOProvided from "../errors/invalid-dto-provided";
import InstituitionGateway from "../gateway/instituition.gateway";

export default class FindInstituitionUseCase {

    constructor(
        private repository: InstituitionGateway
    ) {

    }

    async execute(input: FindInstituitionInputDTO): Promise<FindInstituitionOutputDTO> {
        if (input.id == "") {
            throw new InvalidDTOProvided()
        }
        const instituitionFound = await this.repository.find(input.id)

        if (!instituitionFound) {
            throw new InstituitionNotFound("Instituition not found")
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