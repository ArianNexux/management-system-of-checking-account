import SizeLogo from '../../@shared/domain/value-objects/size-logo.vo';
import Instituition from './instituition.entity';
import Id from '../../@shared/domain/value-objects/id.vo';

describe('Test suit for Instituition Entity', () => {
  it('should change name of Institution', () => {
    const institutionProps = {
      id: new Id(),
      name: 'BSJ',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };
    const instituition = new Instituition(institutionProps);

    instituition.changeName('John Doe');

    expect(instituition.name).toBe('John Doe');
  });

  it('should update the title 1 of Institution', () => {
    const institutionProps = {
      id: new Id(),
      name: 'BSJ',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };
    const instituition = new Instituition(institutionProps);

    instituition.updateTitle1('t1 updated');

    expect(instituition.title1).toBe('t1 updated');
  });

  it('should update the title 2 of Institution', () => {
    const institutionProps = {
      id: new Id(),
      name: 'BSJ',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };
    const instituition = new Instituition(institutionProps);

    instituition.updateTitle2('t2 updated');

    expect(instituition.title2).toBe('t2 updated');
  });

  it('should update the logo of Institution', () => {
    const institutionProps = {
      id: new Id(),
      name: 'BSJ',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };
    const instituition = new Instituition(institutionProps);

    instituition.updatedLogoPath('logo-new.png');

    expect(instituition.logo).toBe('logo-new.png');
  });

  it('should update the size logo of Institution', () => {
    const institutionProps = {
      id: new Id(),
      name: 'BSJ',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };
    const instituition = new Instituition(institutionProps);
    const sizeLogo = new SizeLogo(400, 250);
    instituition.updateSizeLogo(sizeLogo);

    expect(instituition.sizeLogo).toBe(sizeLogo);
  });

  it('should throw an error when Name is empty', () => {
    const institutionProps = {
      id: new Id(),
      name: '',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const instituition = new Instituition(institutionProps);
    }).toThrowError('Name is empty');
  });

  it('should throw an error when title1 is empty', () => {
    const institutionProps = {
      id: new Id(),
      name: 'bsj',
      title1: '',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const instituition = new Instituition(institutionProps);
    }).toThrowError('Title 1 is empty');
  });

  it('should throw an error when title2 is empty', () => {
    const institutionProps = {
      id: new Id(),
      name: 'bsj',
      title1: 't1',
      title2: '',
      logo: 'img.png',
      sizeLogo: new SizeLogo(120, 120),
    };

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const instituition = new Instituition(institutionProps);
    }).toThrowError('Title 2 is empty');
  });
  it('should throw an error when logo is empty', () => {
    const institutionProps = {
      id: new Id(),
      name: 'bsj',
      title1: 't1',
      title2: 't2',
      logo: '',
      sizeLogo: new SizeLogo(120, 120),
    };

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const instituition = new Instituition(institutionProps);
    }).toThrowError('Logo is empty');
  });

  it('should throw an error when Size Logo is empty', () => {
    const institutionProps = {
      id: new Id(),
      name: 'bsj',
      title1: 't1',
      title2: 't2',
      logo: 'img.png',
      sizeLogo: undefined,
    };

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const instituition = new Instituition(institutionProps);
    }).toThrowError('SizeLogo is empty');
  });
});
