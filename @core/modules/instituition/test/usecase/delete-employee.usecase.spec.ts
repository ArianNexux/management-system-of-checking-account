import Email from "../../../@shared/domain/value-objects/email.vo";
import Id from "../../../@shared/domain/value-objects/id.vo";
import Name from "../../../@shared/domain/value-objects/name.vo";
import Employee from "../../domain/employee.entity";
import UpdateEmployeeUseCase from "../../usecase/update-employee.usecase"
import ListEmployeeUseCase from "../../usecase/list-employee.usecase";
import DeleteEmployeeUseCase from "../../usecase/delete-employee.usecase";

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
    let data = [employee1, employee2]
    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            list: jest.fn(),
            delete: jest.fn(async (id) => {
                let index = data.findIndex((elem, index) => {
                    if (elem.id.id == id) {
                        return index
                    }
                });
                data.splice(index, 1)
            })
        }
    }

    test('should delete an Employee', async () => {
        const repository = MockRepository()

        const usecase = new DeleteEmployeeUseCase(repository);
        const input = {
            id: employee2.id.id
        }
        await usecase.execute(input)

        expect(repository.delete).toHaveBeenCalled()
        expect(data.length).toBe(1)
        expect(data[0].id.id).toBe(employee1.id.id);
        expect(data[1]).toBeUndefined();
    })
})