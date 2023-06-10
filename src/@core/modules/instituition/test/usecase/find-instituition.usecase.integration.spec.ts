import Id from "../../../@shared/domain/value-objects/id.vo";
import FindInstituitionUseCase from "../../usecase/find-instituition.usecase";
import InstituitionPrismaRepository from "../../repository/prisma/instituition.repository";
import { PrismaClient } from "@prisma/client";

describe('Test suits Find Instituition Use Case', () => {

    const prisma = new PrismaClient()

    test('should find an instituition', async () => {

        const repository = new InstituitionPrismaRepository()

        const id = new Id()
        const inputToCreate = {
            id: id.value,
            name: 'bsj',
            title1: 't1',
            title2: 't2',
            logo: 'img.png',
            heightLogo: 120,
            widthLogo: 120
        };

        await prisma.instituition.create({
            data: {
                id: inputToCreate.id,
                name: inputToCreate.name,
                logo: inputToCreate.logo,
                heightLogo: inputToCreate.heightLogo.toString(),
                widthLogo: inputToCreate.widthLogo.toString(),
                title1: inputToCreate.title1,
                title2: inputToCreate.title2
            }
        })
        const inputDTO = {
            id: inputToCreate.id
        }
        const usecase = new FindInstituitionUseCase(repository)
        const output = await usecase.execute(inputDTO)

        expect(output.id).toBeDefined()
        expect(output.name).toBe(inputToCreate.name)
        expect(output.logo).toBe(inputToCreate.logo)
        expect(output.heightLogo).toBe(inputToCreate.heightLogo)
        expect(output.widthLogo).toBe(inputToCreate.widthLogo)
        expect(output.title1).toBe(inputToCreate.title1)
        expect(output.title2).toBe(inputToCreate.title2)



    })
})