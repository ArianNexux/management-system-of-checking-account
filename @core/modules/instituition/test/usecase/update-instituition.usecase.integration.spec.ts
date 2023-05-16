import { PrismaClient } from "@prisma/client";
import InstituitionPrismaRepository from "../../repository/prisma/instituition.repository";
import UpdateInstituitionUseCase from "../../usecase/update-instituition.usecase"
import Id from "../../../@shared/domain/value-objects/id.vo";

describe("Test suit to update instituition", () => {

    const prisma = new PrismaClient()

    test('should update an instituition', async () => {
        const repository = new InstituitionPrismaRepository()

        const usecase = new UpdateInstituitionUseCase(repository);
        const id = new Id()
        const input = {
            id: id.id,
            name: 'bsj',
            title1: 't1',
            title2: 't2',
            logo: 'img.png',
            heightLogo: 120,
            widthLogo: 120
        };

        await prisma.instituition.create({
            data: {
                id: input.id,
                name: input.name,
                logo: input.logo,
                heightLogo: input.heightLogo.toString(),
                widthLogo: input.widthLogo.toString(),
                title1: input.title1,
                title2: input.title2
            }
        })

        const output = await usecase.execute(input)

        expect(output.id).toBe(input.id);
        expect(output.name).toBe(input.name);
        expect(output.logo).toBe(input.logo);
        expect(output.title1).toBe(input.title1);
        expect(output.title2).toBe(input.title2);
        expect(output.logo).toBe(input.logo);
        expect(output.heightLogo).toBe(input.heightLogo);
        expect(output.widthLogo).toBe(input.widthLogo);
    })
})