import UpdateEmployeeUseCase from "../../usecase/update-employee.usecase"

describe("Test suit to update Employee", () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn(),
            delete: jest.fn()
        }
    }

    test('should update an Employee', async () => {
        const repository = MockRepository()

        const usecase = new UpdateEmployeeUseCase(repository);

        const input = {
            id: "123",
            name: 'Bento Julio',
            email: 'bentojulio@gmail.com',
            role: 'role',
            photo: 'img.png',
            position: "position",
        };

        const output = await usecase.execute(input)

        expect(repository.update).toHaveBeenCalled()
        expect(output.id).toBe(input.id);
        expect(output.name).toBe(input.name)
        expect(output.email).toBe(input.email)
        expect(output.role).toBe(input.role)
        expect(output.position).toBe(input.position)
        expect(output.photo).toBe(input.photo)
    })
})