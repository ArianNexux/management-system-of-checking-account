import Id from '../../../@shared/value-objects/id.vo'
import Instituition from '../../../domain/instituition/entities/instituition.entity'
import { PrismaClient } from '@prisma/client'
import InstituitionPrismaRepository from './instituition.repository'
import SizeLogo from '../../../@shared/value-objects/size-logo.vo'

describe("Test suits for repository instituition", () => {
    const prisma = new PrismaClient()

    test('should create an instituition', async () => {
        const repository = new InstituitionPrismaRepository()

        const institutionProps = {
            id: new Id(),
            name: 'bsj',
            title1: 't1',
            title2: 't2',
            logo: 'img.png',
            sizeLogo: new SizeLogo(120, 120),
        };

        const instituition = new Instituition(institutionProps)

        await repository.add(instituition)

        const instituitionFound = await prisma.instituition.findFirst({
            where: {
                id: "123"
            }
        })

        expect(instituitionFound.id).toBe(instituition.id)
        expect(instituitionFound.name).toBe(instituition.name)
        expect(instituitionFound.logo).toBe(instituition.logo)
        expect(instituitionFound.title1).toBe(instituition.title1)
        expect(instituitionFound.title2).toBe(instituition.title2)


    })
})