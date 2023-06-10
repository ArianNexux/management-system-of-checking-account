import Id from "../../@shared/domain/value-objects/id.vo";
import SizeLogo from "../../@shared/domain/value-objects/size-logo.vo";
import InstituitionGateway from "../gateway/instituition.gateway";
import Instituition from "../domain/instituition.entity";

export default class UpdateInstituitionUseCase {
    constructor(
        private repository: InstituitionGateway
    ) {

    }


    async execute(input: UpdateInstituitionInputDTO): Promise<UpdateInstituitionOutputDTO> {
        const instituitionProps = {
            id: new Id(input.id),
            name: input.name,
            logo: input.logo,
            sizeLogo: new SizeLogo(input.heightLogo, input.widthLogo),
            title1: input.title1,
            title2: input.title2,
        }

        const instituition = new Instituition(instituitionProps)

        await this.repository.update(instituition)

        return {
            id: input.id,
            name: input.name,
            logo: input.logo,
            heightLogo: input.heightLogo,
            widthLogo: input.widthLogo,
            title1: input.title1,
            title2: input.title2
        }
    }
}