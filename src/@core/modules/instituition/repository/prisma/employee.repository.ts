import { PrismaClient } from "@prisma/client";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Employee from "../../domain/employee.entity";
import EmployeeGateway from "../../gateway/employee.gateway";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Email from "../../../@shared/domain/value-objects/email.vo";

export default class EmployeeRepository implements EmployeeGateway {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async add(entity: Employee): Promise<void> {
        if (!entity) {
            throw new Error("Please provide an entity")
        }


        await this.prisma.employee.create({
            data: {
                id: entity.id.value,
                name: entity.name.value,
                email: entity.email.value,
                role: entity.role,
                position: entity.position,
                photo: entity.photo,
                password: entity.password
            }
        })

    }
    async update(entity: Employee): Promise<void> {
        await this.prisma.employee.update({
            data: {
                id: entity.id.value,
                name: entity.name.value,
                email: entity.email.value,
                role: entity.role,
                position: entity.position,
                photo: entity.photo,
                password: entity.password
            },
            where: {
                id: entity.id.value
            }
        })
    }
    async find(id: string): Promise<Employee> {
        const response = await this.prisma.employee.findFirst({
            where: { id }
        })

        let employeeProps = {
            id: new Id(id),
            name: new Name(response.name),
            email: new Email(response.email),
            role: response.role,
            position: response.position,
            photo: response.photo,
            password: response.password
        }


        const employee = new Employee(employeeProps)


        return employee
    }

    async list(input: { limit: number; page: number; }): Promise<Employee[]> {
        const total = await this.prisma.employee.count()
        // const perPage = total / input.limit
        const response = await this.prisma.employee.findMany({
            take: parseInt(input.limit.toString()),
            orderBy: {
                createdAt: 'desc',
            }
        })

        const output: Employee[] = response.map((elem) => {
            let employeeProps = {
                id: new Id(elem.id),
                name: new Name(elem.name),
                email: new Email(elem.email),
                role: elem.role,
                position: elem.position,
                photo: elem.photo
            }

            return new Employee(employeeProps)
        })

        return output
    }

    async delete(id: string): Promise<void> {

        if (!id || id.length < 0) {
            throw new Error("Cannot delete, Please provide an valid id")
        }

        await this.prisma.employee.delete({
            where: {
                id
            }
        })
    }

    async findByEmail(email: string): Promise<Employee> {
        const output = await this.prisma.employee.findFirst({
            where: {
                email
            }
        })

        if (!output) {
            throw new Error(`Could not find employee`);
        }

        return new Employee({
            id: new Id(output.id),
            email: new Email(output.email),
            name: new Name(output.name),
            photo: output.photo,
            position: output.position,
            role: output.role,
            password: output.password
        })
    }
}