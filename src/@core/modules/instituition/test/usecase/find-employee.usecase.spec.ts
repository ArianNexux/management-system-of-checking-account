import Id from "../../../@shared/domain/value-objects/id.vo";
import Employee from "../../domain/employee.entity";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Email from "../../../@shared/domain/value-objects/email.vo";
import FindEmployeeUseCase from "../../usecase/find-employee.usecase";
import { faker } from '@faker-js/faker';

describe('Test suits Find Employee Use Case', () => {
    const propsEmployee = {
        id: new Id(),
        name: new Name("Bento Julio"),
        email: new Email(faker.internet.email()),
        role: 'role',
        photo: 'img.png',
        position: "position",
        password: "123"
    };
    const employeeReturned = new Employee(propsEmployee)
    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(employeeReturned)),
            update: jest.fn(),
            list: jest.fn(),
            delete: jest.fn()
        }
    }
    test('should find an employee', async () => {
        const repository = MockRepository()
        const input = {
            id: "123"
        }
        const usecase = new FindEmployeeUseCase(repository)
        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(propsEmployee.name.value)
        expect(output.email).toBe(propsEmployee.email.value)
        expect(output.role).toBe(propsEmployee.role)
        expect(output.position).toBe(propsEmployee.position)
        expect(output.photo).toBe(propsEmployee.photo)



    })
})