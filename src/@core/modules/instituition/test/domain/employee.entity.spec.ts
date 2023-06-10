import Email from '../../../@shared/domain/value-objects/email.vo';
import Id from '../../../@shared/domain/value-objects/id.vo';
import Name from '../../../@shared/domain/value-objects/name.vo';
import Employee from '../../domain/employee.entity';

describe('Test suits for Employeers entity', () => {
  it('should change the fields of the employee', () => {
    const props = {
      id: new Id(),
      name: new Name('Bento Julio'),
      email: new Email('bentojulio2022@gmail.com'),
      photo: 'img.png',
      role: 'Administrator',
      position: 'FullCycle Developer',
      password: "123"
    };
    const employee = new Employee(props);

    const newName = new Name('Bento Siala Júlio');
    const newEmail = new Email('ariannexux0101@gmail.com');
    employee.changeName(newName);
    employee.updateEmail(newEmail);
    employee.updatePhoto('updated.png');
    employee.updateRole('User');
    employee.updatePosition('Backend Developer');
    expect(employee.name.value).toBe('Bento Siala Júlio');
    expect(employee.email.value).toBe('ariannexux0101@gmail.com');
    expect(employee.photo).toBe('updated.png');
    expect(employee.role).toBe('User');
    expect(employee.position).toBe('Backend Developer');
  });

  it('should throw an error when name is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(),
        name: new Name('Bento'),
        email: new Email('bentojulio2022@gmail.com'),
        photo: 'img.png',
        role: 'Administrator',
        position: 'FullCycle Developer',
        password: "123"
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employee = new Employee(props);
    }).toThrowError('Please provide a valid name');
  });

  it('should throw an error when email valid is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(),
        name: new Name('Bento Julio'),
        email: new Email('bentojulio2022gmail.com'),
        photo: 'img.png',
        role: 'Administrator',
        position: 'FullCycle Developer',
        password: "123"
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employee = new Employee(props);
    }).toThrowError('Please provide a valid email address');
  });

  it('should throw an error when photo is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(),
        name: new Name('Bento Julio'),
        email: new Email('bentojulio2022@gmail.com'),
        photo: '',
        role: 'Administrator',
        position: 'FullCycle Developer',
        password: "123"
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employee = new Employee(props);
    }).toThrowError('Please provide a photo');
  });

  it('should throw an error when role is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(),
        name: new Name('Bento Julio'),
        email: new Email('bentojulio2022@gmail.com'),
        photo: 'img.png',
        role: '',
        position: 'FullCycle Developer',
        password: "123"
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employee = new Employee(props);
    }).toThrowError('Please provide a role');
  });

  it('should throw an error when position is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(),
        name: new Name('Bento Julio'),
        email: new Email('bentojulio2022@gmail.com'),
        photo: 'img.png',
        role: 'Administrator',
        position: '',
        password: "123"
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employee = new Employee(props);
    }).toThrowError('Please provide a position');
  });
});
