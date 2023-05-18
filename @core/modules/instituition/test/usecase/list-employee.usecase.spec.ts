import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Employee from "../../domain/employee.entity";
import ListEmployeeUseCase from "../../usecase/list-employee.usecase";

describe("Test suit to list Employee", () => {
    const propsEmployee1 = {
        id: new Id(),
        name: new Name("Bento Julio"),
        email: new Email('bentojulio@gmail.com'),
        role: 'role',
        photo: 'img.png',
        position: "position"
    };

    const propsEmployee2 = {
        id: new Id(),
        name: new Name("Ariano Julio"),
        email: new Email('ariannexux@gmail.com'),
        role: 'role1',
        photo: 'img1.png',
        position: "position1"
    };

    const employee1 = new Employee(propsEmployee1)
    const employee2 = new Employee(propsEmployee2)

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn().mockReturnValue(Promise.resolve([employee1, employee2])),
            delete: jest.fn()
        }
    }

    test('should list an Employee', async () => {
        const repository = MockRepository()

        const usecase = new ListEmployeeUseCase(repository);
        const input = {
            page: 1,
            limit: 2,
        }
        const output = await usecase.execute(input)

        expect(repository.list).toHaveBeenCalled()
        expect(output.data.length).toBe(2)
        expect(output.data[0].id).toBe(employee1.id.id);
        expect(output.data[0].name).toBe(employee1.name.name)
        expect(output.data[0].email).toBe(employee1.email.email)
        expect(output.data[0].role).toBe(employee1.role)
        expect(output.data[0].position).toBe(employee1.position)
        expect(output.data[0].photo).toBe(employee1.photo)
        expect(output.data[1].id).toBe(employee2.id.id);
        expect(output.data[1].name).toBe(employee2.name.name)
        expect(output.data[1].email).toBe(employee2.email.email)
        expect(output.data[1].role).toBe(employee2.role)
        expect(output.data[1].position).toBe(employee2.position)
        expect(output.data[1].photo).toBe(employee2.photo)
    })
})