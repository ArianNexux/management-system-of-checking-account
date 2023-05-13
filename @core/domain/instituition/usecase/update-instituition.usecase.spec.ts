import UpdateInstituitionUseCase from "./update-instituition.usecase"

describe("Test suit to update instituition", () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn()
        }
    }

    test('should update an instituition', async () => {
        const repository = MockRepository()

        const usecase = new UpdateInstituitionUseCase(repository);

        const input = {
            id: "123",
            name: 'bsj',
            title1: 't1',
            title2: 't2',
            logo: 'img.png',
            heightLogo: 120,
            widthLogo: 120
        };

        const output = await usecase.execute(input)

        expect(repository.update).toHaveBeenCalled()
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