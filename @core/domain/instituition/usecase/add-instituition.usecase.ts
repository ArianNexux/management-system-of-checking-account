import Id from "../../../@shared/value-objects/id.vo";
import SizeLogo from "../../../@shared/value-objects/size-logo.vo";
import Instituition from "../entities/instituition.entity";
import InstituitionGateway from "../gateway/instituition.gateway";
import { AddInstituitionInputDTO, AddInstituitionOutputDTO } from "../../../@shared/dtos/add-instituition.dto";

export default class AddEmployeeUseCase {

    constructor(
        private repository: InstituitionGateway
    ) {

    }

    async execute(input: AddInstituitionInputDTO): Promise<AddInstituitionOutputDTO> {
        if (!input) {
            throw new Error("Input DTO was not provided")
        }

        const propsInstitution = {
            id: new Id(),
            name: input.name,
            title1: input.title1,
            title2: input.title2,
            logo: input.logo,
            sizeLogo: new SizeLogo(input.heightLogo, input.widthLogo)
        }

        const instituition = new Instituition(propsInstitution)

        await this.repository.add(instituition)


        return {
            id: instituition.id.id,
            name: instituition.name,
            title1: instituition.title1,
            title2: instituition.title2,
            widthLogo: instituition.sizeLogo.width,
            heightLogo: instituition.sizeLogo.height,
            logo: instituition.logo
        }

    }
}