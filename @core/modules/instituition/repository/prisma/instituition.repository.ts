import { PrismaClient } from "@prisma/client";
import Instituition from "../../domain/instituition.entity";
import InstituitionGateway from "../../gateway/instituition.gateway";
import Id from "../../../@shared/domain/value-objects/id.vo";
import SizeLogo from "../../../@shared/domain/value-objects/size-logo.vo";

export default class InstituitionPrismaRepository implements InstituitionGateway {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }
    async add(entity: Instituition): Promise<void> {
        if (!entity) {
            throw new Error("Please provide an entity")
        }


        await this.prisma.instituition.create({
            data: {
                id: entity.id.value,
                name: entity.name,
                logo: entity.logo,
                heightLogo: entity.sizeLogo.height.toString(),
                widthLogo: entity.sizeLogo.width.toString(),
                title1: entity.title1,
                title2: entity.title2
            }
        })

    }
    async update(entity: Instituition): Promise<void> {
        await this.prisma.instituition.update({
            data: {
                name: entity.name,
                logo: entity.logo,
                heightLogo: entity.sizeLogo.height.toString(),
                widthLogo: entity.sizeLogo.width.toString(),
                title1: entity.title1,
                title2: entity.title2
            },
            where: {
                id: entity.id.value
            }
        })
    }
    async find(id: string): Promise<Instituition> {
        const response = await this.prisma.instituition.findFirst({
            where: { id }
        })

        let instituitionProps = {
            id: new Id(id),
            name: response.name,
            logo: response.logo,
            sizeLogo: new SizeLogo(parseInt(response.heightLogo), parseInt(response.widthLogo)),
            title1: response.title1,
            title2: response.title2
        }


        const instituition = new Instituition(instituitionProps)


        return instituition
    }

}