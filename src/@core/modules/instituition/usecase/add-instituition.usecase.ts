import Id from "../../@shared/domain/value-objects/id.vo";
import SizeLogo from "../../@shared/domain/value-objects/size-logo.vo";
import Instituition from "../domain/instituition.entity";
import InstituitionGateway from "../gateway/instituition.gateway";
import { AddInstituitionInputDTO, AddInstituitionOutputDTO } from "../../@shared/dtos/add-instituition.dto";
import InvalidDTOProvided from "../errors/invalid-dto-provided";

export default class AddInstituitionUseCase {

    constructor(
        private repository: InstituitionGateway,
    ) {

    }

    async execute(input: AddInstituitionInputDTO): Promise<AddInstituitionOutputDTO> {
        if (!input) {
            throw new InvalidDTOProvided()
        }

        const propsInstitution = {
            id: new Id(),
            name: input.name,
            title1: input.title1,
            title2: input.title2,
            logo: input.logo,
            sizeLogo: new SizeLogo(input.heightLogo, input.widthLogo),
        }

        const instituition = new Instituition(propsInstitution)

        await this.repository.add(instituition)


        return {
            id: instituition.id.value,
            name: instituition.name,
            title1: instituition.title1,
            title2: instituition.title2,
            widthLogo: instituition.sizeLogo.width,
            heightLogo: instituition.sizeLogo.height,
            logo: instituition.logo
        }

    }
}