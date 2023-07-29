import { PrismaClient } from "@prisma/client";
import Id from "../../../@shared/domain/value-objects/id.vo";
import ExpenditureCategory from "../../domain/expenditure-category.entity";
import ExpenditureCategoryGateway from "../../gateway/expenditure-category.gateway";

export default class ExpenditureCategoryRepository implements ExpenditureCategoryGateway {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async add(entity: ExpenditureCategory): Promise<void> {
        if (!entity) {
            throw new Error("Please provide an entity")
        }


        await this.prisma.expenditureCategory.create({
            data: {
                id: entity.id.value,
                name: entity.name,
            }
        })

    }
    async update(entity: ExpenditureCategory): Promise<void> {
        await this.prisma.expenditureCategory.update({
            data: {
                id: entity.id.value,
                name: entity.name,
            },
            where: {
                id: entity.id.value
            }
        })
    }
    async find(id: string): Promise<ExpenditureCategory> {
        const response = await this.prisma.expenditureCategory.findFirst({
            where: { id }
        })

        let expenditureCategoryProps = {
            id: new Id(id),
            name: response.name,
        }


        const expenditureCategory = new ExpenditureCategory(expenditureCategoryProps)


        return expenditureCategory
    }

    async count(): Promise<number> {
        const response = await this.prisma.expenditureCategory.count()

        return response
    }
    async list(input: { limit: number; page: number; }): Promise<ExpenditureCategory[]> {
        const response = await this.prisma.expenditureCategory.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const output: ExpenditureCategory[] = response.map((elem) => {
            let expenditureCategoryProps = {
                id: new Id(elem.id),
                name: elem.name,

            }

            return new ExpenditureCategory(expenditureCategoryProps)
        })

        return output
    }

    async delete(id: string): Promise<void> {

        if (!id || id.length < 0) {
            throw new Error("Cannot delete, Please provide an valid id")
        }

        await this.prisma.expenditureCategory.delete({
            where: {
                id
            }
        })
    }
}