
import Id from '../../../@shared/domain/value-objects/id.vo';
import Expenditure from '../../domain/expenditure.entity';
import Supplier from '../../domain/supplier.entity';
import Transaction from '../../domain/transaction.entity';
import { faker } from '@faker-js/faker'
import Email from '../../../@shared/domain/value-objects/email.vo';
import Name from '../../../@shared/domain/value-objects/name.vo';
import { TypeOfTransaction } from '../../../@shared/domain/enums/type.transaction.enum';
describe('Test suit for Transaction Entity', () => {
  const propsSupplier = {
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
  const propsExpenditure = {
    id: new Id(),
    name: "Table",
    type: "any"
  }
  it('should update fields of Transaction', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Debit,
      amount: 100,
      balance_after: 120,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };
    const transaction = new Transaction(transactionProps);

    transaction.changeDescription('new Description');
    transaction.changeType(TypeOfTransaction.Credit);
    transaction.changeAmount(300);
    transaction.updateBalanceAfter(350);
    transaction.updateTicket("novo.pdf");
    transaction.updateReference("321");

    expect(transaction.description).toBe('new Description');
    expect(transaction.type).toBe(TypeOfTransaction.Credit);
    expect(transaction.amount).toBe(300);
    expect(transaction.balance_after).toBe(350);
    expect(transaction.ticket).toBe("novo.pdf");
    expect(transaction.reference).toBe("321");
  });


  it('should throw an error when amount is invalid', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 0,
      balance_after: 120,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a valid amount');
  });

  it('should throw an error when supplier is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 120,
      supplier: null,
      reference: "123",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a supplier');
  });

  it('should throw an error when Expenditure is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: null,
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 120,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a expenditure');
  });

  it('should throw an exception when balance after the transaction is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 0,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a valid Balance After');
  });

  it('should throw an exception when supplier is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 10,
      supplier: null,
      reference: "123",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a supplier');
  });

  it('should throw an exception when reference is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 10,
      supplier: new Supplier(propsSupplier),
      reference: "",
      description: "Pagamento do Projecto 1",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError("Please provide a reference for the transaction");
  });

  it('should throw an exception when description is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 10,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "",
      ticket: "comprovativo.pdf",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a description for the transaction');
  });

  it('should throw an exception when ticket is empty', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 10,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "description",
      ticket: "",
      date_of: new Date()
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a ticket for the transaction');
  });


  it('should throw an exception when date is null', () => {
    const transactionProps = {
      id: new Id(),
      expenditure: new Expenditure(propsExpenditure),
      type: TypeOfTransaction.Credit,
      amount: 10,
      balance_after: 10,
      supplier: new Supplier(propsSupplier),
      reference: "123",
      description: "description",
      ticket: "comprovativo.pdf",
      date_of: null
    };

    expect(() => {
      new Transaction(transactionProps);
    }).toThrowError('Please provide a valid Date');
  });
});
