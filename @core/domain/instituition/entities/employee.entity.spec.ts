import Email from '../../../@shared/value-objects/email.vo';
import Id from '../../../@shared/value-objects/id.vo';
import Name from '../../../@shared/value-objects/name.vo';
import Employee from './employee.entity';

describe('Test suits for Employeers entity', () => {
  it('should change the fields of the employee', () => {
    const props = {
      id: new Id(),
      name: new Name('Bento Julio'),
      email: new Email('bentojulio2022@gmail.com'),
      photo: 'img.png',
      role: 'Administrator',
      position: 'FullCycle Developer',
    };
    const employee = new Employee(props);

    const newName = new Name('Bento Siala Júlio');
    const newEmail = new Email('ariannexux0101@gmail.com');
    employee.changeName(newName);
    employee.updateEmail(newEmail);
    employee.updatePhoto('updated.png');
    employee.updateRole('User');
    employee.updatePosition('Backend Developer');
    expect(employee.name.name).toBe('Bento Siala Júlio');
    expect(employee.email.email).toBe('ariannexux0101@gmail.com');
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
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employee = new Employee(props);
    }).toThrowError('Please provide a position');
  });
});
