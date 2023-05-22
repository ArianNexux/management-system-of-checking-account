
import Id from '../../../@shared/domain/value-objects/id.vo';
import Expenditure from '../../domain/expenditure.entity';

describe('Test suit for Expenditure Entity', () => {
  it('should change name of Expenditure', () => {
    const expenditureProps = {
      id: new Id(),
      name: 'Mesa',
      type: 'Nope'
    };
    const expenditure = new Expenditure(expenditureProps);

    expenditure.changeName('Cadeira');
    expenditure.updateType('novoTipo');

    expect(expenditure.name).toBe('Cadeira');
    expect(expenditure.type).toBe('novoTipo');
  });

  it('should change name of Expenditure', () => {
    const expenditureProps = {
      id: new Id(),
      name: 'Mesa',
      type: 'Nope'
    };
    const expenditure = new Expenditure(expenditureProps);

    expenditure.changeName('Cadeira');
    expenditure.updateType('novoTipo');

    expect(expenditure.name).toBe('Cadeira');
    expect(expenditure.type).toBe('novoTipo');
  });

  it('should change fields of Expenditure', () => {
    const expenditureProps = {
      id: new Id(),
      name: '',
      type: 'Nope'
    };
    expect(() => {
      new Expenditure(expenditureProps);
    }).toThrowError('Please provide a name for the expenditure');
  });


  it('should change fields of Expenditure', () => {
    const expenditureProps = {
      id: new Id(),
      name: 'Mesa',
      type: ''
    };
    expect(() => {
      new Expenditure(expenditureProps);
    }).toThrowError('Please provide a Type for the expenditure');
  });
});
