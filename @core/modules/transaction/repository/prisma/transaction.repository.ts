import { PrismaClient } from "@prisma/client";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Transaction from "../../domain/transaction.entity";
import TransactionGateway from "../../gateway/transaction.gateway";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Email from "../../../@shared/domain/value-objects/email.vo";
import Supplier from "../../domain/supplier.entity";
import Expenditure from "../../domain/expenditure.entity";

export default class TransactionRepository implements TransactionGateway {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async add(entity: Transaction): Promise<void> {
        if (!entity) {
            throw new Error("Please provide an entity")
        }


        await this.prisma.transaction.create({
            data: {
                id: entity.id.value,
                expenditureId: entity.expenditure.id.value,
                type: entity.type,
                amount: entity.amount,
                balance_after: entity.balance_after,
                supplierId: entity.supplier.id.value,
                reference: entity.reference,
                description: entity.description,
                ticket: entity.ticket,
                date_doc: new Date(entity.date_doc)
            }
        })

    }
    async update(entity: Transaction): Promise<void> {
        await this.prisma.transaction.update({
            data: {
                id: entity.id.value,
                expenditureId: entity.expenditure.id.value,
                type: entity.type,
                amount: entity.amount,
                balance_after: entity.balance_after,
                supplierId: entity.supplier.id.value,
                reference: entity.reference,
                description: entity.description,
                ticket: entity.ticket,
                date_doc: new Date(entity.date_doc),
            },
            where: {
                id: entity.id.value
            }
        })
    }
    async find(id: string): Promise<Transaction> {
        const response = await this.prisma.transaction.findFirst({
            where: { id },
            include: {
                expenditure: true,
                supplier: true
            }
        })
        const supplier = new Supplier({
            id: new Id(response.supplier.id),
            email: new Email(response.supplier.email),
            name: new Name(response.supplier.name),
            address: response.supplier.address,
            code: response.supplier.code,
            manager: response.supplier.manager,
            nif: response.supplier.nif,
            supplier_nature: response.supplier.supplier_nature,
            telephone: response.supplier.telephone
        })

        const expenditure = new Expenditure({
            id: new Id(response.expenditure.id),
            type: response.expenditure.type,
            name: response.expenditure.name
        })

        let transactionProps = {
            id: new Id(response.id),
            type: response.type,
            amount: response.amount,
            balance_after: response.balance_after,
            reference: response.reference,
            description: response.description,
            ticket: response.ticket,
            date_doc: new Date(response.date_doc),
            expenditure,
            supplier,

        }


        const transaction = new Transaction(transactionProps)


        return transaction
    }

    async list(input: { limit: number; page: number; }): Promise<Transaction[]> {
        const response = await this.prisma.transaction.findMany({
            take: input.limit,
            include: {
                expenditure: true,
                supplier: true
            }
        })

        const output: Transaction[] = response.map((elem) => {

            const supplier = new Supplier({
                id: new Id(elem.supplier.id),
                email: new Email(elem.supplier.email),
                name: new Name(elem.supplier.name),
                address: elem.supplier.address,
                code: elem.supplier.code,
                manager: elem.supplier.manager,
                nif: elem.supplier.nif,
                supplier_nature: elem.supplier.supplier_nature,
                telephone: elem.supplier.telephone
            })

            const expenditure = new Expenditure({
                id: new Id(elem.expenditure.id),
                type: elem.expenditure.type,
                name: elem.expenditure.name
            })

            let transactionProps = {
                id: new Id(elem.id),
                type: elem.type,
                amount: elem.amount,
                balance_after: elem.balance_after,
                reference: elem.reference,
                description: elem.description,
                ticket: elem.ticket,
                date_doc: new Date(elem.date_doc),
                supplier,
                expenditure,

            }

            return new Transaction(transactionProps)
        })

        return output
    }

    async delete(id: string): Promise<void> {

        if (!id || id.length < 0) {
            throw new Error("Cannot delete, Please provide an valid id")
        }

        await this.prisma.transaction.delete({
            where: {
                id
            }
        })
    }
}