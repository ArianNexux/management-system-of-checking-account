import { PrismaClient } from "@prisma/client";
import Instituition from "../../../domain/instituition/entities/instituition.entity";
import InstituitionGateway from "../../../domain/instituition/gateway/instituition.gateway";

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
                id: entity.id.id,
                name: entity.name,
                logo: entity.logo,
                heightLogo: entity.sizeLogo.height.toString(),
                widthLogo: entity.sizeLogo.width.toString(),
                title1: entity.title1,
                title2: entity.title2
            }
        })

    }
    update(entity: Instituition): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Instituition> {
        throw new Error("Method not implemented.");
    }

}