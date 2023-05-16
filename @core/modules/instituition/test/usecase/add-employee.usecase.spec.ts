
import AddEmployeeUseCase from "../../usecase/add-employee.usecase";

describe('Test suits of use case to create employer', () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn(),
            delete: jest.fn()
        }
    }
    test('should create an employer', async () => {
        const repository = MockRepository()

        const usecase = new AddEmployeeUseCase(repository);

        const input = {
            name: 'Bento Julio',
            email: 'bentojulio@email.com',
            role: 'role',
            photo: 'img.png',
            position: "position"
        };

        const output = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.role).toBe(input.role);
        expect(output.email).toBe(input.email);
        expect(output.position).toBe(input.position);

    });
});
