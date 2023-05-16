import Id from '../../../@shared/domain/value-objects/id.vo'
import Instituition from '../../domain/instituition.entity'
import { PrismaClient } from '@prisma/client'
import InstituitionPrismaRepository from './instituition.repository'
import SizeLogo from '../../../@shared/domain/value-objects/size-logo.vo'

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
                id: institutionProps.id.id
            }
        })
        expect(instituitionFound.id).toBe(instituition.id.id)
        expect(instituitionFound.name).toBe(instituition.name)
        expect(instituitionFound.logo).toBe(instituition.logo)
        expect(instituitionFound.title1).toBe(instituition.title1)
        expect(instituitionFound.title2).toBe(instituition.title2)

    })

    test("should update an instituition", async () => {
        const repository = new InstituitionPrismaRepository()

        const institutionProps = {
            id: new Id(),
            name: 'bsj',
            title1: 't1',
            title2: 't2',
            logo: 'img.png',
            sizeLogo: new SizeLogo(120, 120),
        };
        const instituitionToUpdate = new Instituition(institutionProps)

        await prisma.instituition.create({
            data: {
                id: instituitionToUpdate.id.id,
                name: instituitionToUpdate.name,
                logo: instituitionToUpdate.logo,
                heightLogo: instituitionToUpdate.sizeLogo.height.toString(),
                widthLogo: instituitionToUpdate.sizeLogo.width.toString(),
                title1: instituitionToUpdate.title1,
                title2: instituitionToUpdate.title2
            }
        })

        instituitionToUpdate.changeName("bsj updated")
        instituitionToUpdate.updateTitle1("title1 updated")
        instituitionToUpdate.updateTitle2("title2 updated")

        await repository.update(instituitionToUpdate)

        const instituitionFound = await prisma.instituition.findFirst({
            where: {
                id: institutionProps.id.id
            }
        })
        expect(instituitionFound.id).toBe(instituitionToUpdate.id.id)
        expect(instituitionFound.name).toBe(instituitionToUpdate.name)
        expect(instituitionFound.logo).toBe(instituitionToUpdate.logo)
        expect(instituitionFound.title1).toBe(instituitionToUpdate.title1)
        expect(instituitionFound.title2).toBe(instituitionToUpdate.title2)

    })


    test("should find an instituition", async () => {
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

        await prisma.instituition.create({
            data: {
                id: instituition.id.id,
                name: instituition.name,
                logo: instituition.logo,
                heightLogo: instituition.sizeLogo.height.toString(),
                widthLogo: instituition.sizeLogo.width.toString(),
                title1: instituition.title1,
                title2: instituition.title2
            }
        })

        let instituitionFound = await repository.find(instituition.id.id)

        expect(instituitionFound.id.id).toBe(instituition.id.id)
        expect(instituitionFound.name).toBe(instituition.name)
        expect(instituitionFound.logo).toBe(instituition.logo)
        expect(instituitionFound.title1).toBe(instituition.title1)
        expect(instituitionFound.title2).toBe(instituition.title2)

    })

})