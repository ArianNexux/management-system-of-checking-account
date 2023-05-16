import Id from "../../../@shared/domain/value-objects/id.vo";
import SizeLogo from "../../../@shared/domain/value-objects/size-logo.vo";
import AddInstituitionUseCase from "../../usecase/add-instituition.usecase";

describe('Test suits of use case to create institution', () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn()
        }
    }
    test('should create an instituition', async () => {
        const repository = MockRepository()

        const usecase = new AddInstituitionUseCase(repository);

        const input = {
            name: 'bsj',
            title1: 't1',
            title2: 't2',
            logo: 'img.png',
            heightLogo: 120,
            widthLogo: 120
        };

        const output = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.logo).toBe(input.logo);
        expect(output.title1).toBe(input.title1);
        expect(output.title2).toBe(input.title2);
        expect(output.logo).toBe(input.logo);
        expect(output.heightLogo).toBe(input.heightLogo);
        expect(output.widthLogo).toBe(input.widthLogo);

    });
});
