import { PrismaClient } from "@prisma/client";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Expenditure from "../../domain/expenditure.entity";
import ExpenditureGateway from "../../gateway/expenditure.gateway";

export default class ExpenditureRepository implements ExpenditureGateway {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async add(entity: Expenditure): Promise<void> {
        if (!entity) {
            throw new Error("Please provide an entity")
        }


        await this.prisma.expenditure.create({
            data: {
                id: entity.id.value,
                name: entity.name,
                type: entity.type,
            }
        })

    }
    async update(entity: Expenditure): Promise<void> {
        await this.prisma.expenditure.update({
            data: {
                id: entity.id.value,
                name: entity.name,
                type: entity.type,
            },
            where: {
                id: entity.id.value
            }
        })
    }
    async find(id: string): Promise<Expenditure> {
        const response = await this.prisma.expenditure.findFirst({
            where: { id }
        })

        let expenditureProps = {
            id: new Id(id),
            name: response.name,
            type: response.type
        }


        const expenditure = new Expenditure(expenditureProps)


        return expenditure
    }

    async list(input: { limit: number; page: number; }): Promise<Expenditure[]> {
        const response = await this.prisma.expenditure.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const output: Expenditure[] = response.map((elem) => {
            let expenditureProps = {
                id: new Id(elem.id),
                name: elem.name,
                type: elem.type

            }

            return new Expenditure(expenditureProps)
        })

        return output
    }

    async delete(id: string): Promise<void> {

        if (!id || id.length < 0) {
            throw new Error("Cannot delete, Please provide an valid id")
        }

        await this.prisma.expenditure.delete({
            where: {
                id
            }
        })
    }
}