import Id from "../../../@shared/value-objects/id.vo";
import Instituition from "../entities/instituition.entity";
import SizeLogo from "../../../@shared/value-objects/size-logo.vo";
import FindInstituitionUseCase from "./find-instituition.usecase";

describe('Test suits Find Instituition Use Case', () => {
    const propsInstituition = {
        id: new Id(),
        name: "Inst1",
        title1: 't1',
        title2: 't2',
        logo: 'img.png',
        sizeLogo: new SizeLogo(120, 120)
    };
    const instustituionReturned = new Instituition(propsInstituition)
    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(instustituionReturned)),
            update: jest.fn(),
            list: jest.fn()
        }
    }
    test('should find an instituition', async () => {
        const repository = MockRepository()
        const input = {
            id: "123"
        }
        const usecase = new FindInstituitionUseCase(repository)
        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(propsInstituition.name)
        expect(output.logo).toBe(propsInstituition.logo)
        expect(output.heightLogo).toBe(propsInstituition.sizeLogo.height)
        expect(output.widthLogo).toBe(propsInstituition.sizeLogo.width)
        expect(output.title1).toBe(propsInstituition.title1)
        expect(output.title2).toBe(propsInstituition.title2)



    })
})