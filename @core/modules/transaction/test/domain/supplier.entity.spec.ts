import Email from '../../../@shared/domain/value-objects/email.vo';
import Id from '../../../@shared/domain/value-objects/id.vo';
import Name from '../../../@shared/domain/value-objects/name.vo';
import Supplier from '../../domain/supplier.entity';
import { faker } from '@faker-js/faker'
describe('Test suits for Supplierrs entity', () => {
  it('should change the fields of the supplier', () => {
    const props = {
      id: new Id(faker.string.uuid()),
      name: new Name(faker.company.name()),
      email: new Email(faker.internet.email()),
      code: faker.string.uuid(),
      supplier_nature: "Service",
      nif: faker.number.int().toString(),
      telephone: faker.phone.number(),
      address: "123",
      manager: faker.person.fullName(),
    };
    const supplier = new Supplier(props);

    const newName = new Name(faker.company.name())
    const newEmail = new Email(faker.internet.email());
    const newManager = faker.person.fullName();
    const newCode = faker.string.uuid();
    const newTelephone = faker.phone.number()
    supplier.changeName(newName);
    supplier.updateEmail(newEmail);
    supplier.updateCode(newCode);
    supplier.updateAddress('321');
    supplier.updateManager(newManager);
    supplier.updatePhone(newTelephone);
    supplier.updateSupplierNature("Product");
    expect(supplier.name.value).toBe(newName.value);
    expect(supplier.email.value).toBe(newEmail.value);
    expect(supplier.code).toBe(newCode);
    expect(supplier.telephone).toBe(newTelephone);
    expect(supplier.manager).toBe(newManager);
    expect(supplier.supplier_nature).toBe("Product");
    expect(supplier.address).toBe("321");
  });

  it('should throw an error when name is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(""),
        email: new Email(faker.internet.email()),
        code: faker.string.uuid(),
        supplier_nature: "Service",
        nif: faker.number.int().toString(),
        telephone: faker.phone.number(),
        address: "123",
        manager: faker.person.fullName(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a valid name');
  });

  it('should throw an error when email valid is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email("bento"),
        code: faker.string.uuid(),
        supplier_nature: "Service",
        nif: faker.number.int().toString(),
        telephone: faker.phone.number(),
        address: "123",
        manager: faker.person.fullName(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a valid email address');
  });

  it('should throw an error when code is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email(faker.internet.email()),
        code: "",
        supplier_nature: "Service",
        nif: faker.number.int().toString(),
        telephone: faker.phone.number(),
        address: "123",
        manager: faker.person.fullName(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a code');
  });

  it('should throw an error when supplier_nature is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email(faker.internet.email()),
        code: faker.string.uuid(),
        supplier_nature: "",
        nif: faker.number.int().toString(),
        telephone: faker.phone.number(),
        address: "123",
        manager: faker.person.fullName(),
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a Supplier Nature');
  });

  it('should throw an error when nif is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email(faker.internet.email()),
        code: faker.string.uuid(),
        supplier_nature: "Service",
        nif: "",
        telephone: faker.phone.number(),
        address: "123",
        manager: faker.person.fullName(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a valid nif');
  });

  it('should throw an error when telephone is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email(faker.internet.email()),
        code: faker.string.uuid(),
        supplier_nature: "Service",
        nif: faker.number.int().toString(),
        telephone: "",
        address: "123",
        manager: faker.person.fullName(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a telephone');
  });

  it('should throw an error when address is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email(faker.internet.email()),
        code: faker.string.uuid(),
        supplier_nature: "Service",
        nif: faker.number.int().toString(),
        telephone: faker.phone.number(),
        address: "",
        manager: faker.person.fullName(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide an address');
  });
  it('should throw an error when manager is not provided', () => {
    expect(() => {
      const props = {
        id: new Id(faker.string.uuid()),
        name: new Name(faker.company.name()),
        email: new Email(faker.internet.email()),
        code: faker.string.uuid(),
        supplier_nature: "Service",
        nif: "",
        telephone: faker.phone.number(),
        address: "123",
        manager: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplier = new Supplier(props);
    }).toThrowError('Please provide a manager');
  });
});
