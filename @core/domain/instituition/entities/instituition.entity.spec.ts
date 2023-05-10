import SizeLogo from '../../../@shared/value-objects/size-logo.vo';
import Instituition from './instituition.entity';
import Id from '../../../@shared/value-objects/id.vo';

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

  it('should throw an error when one of the fields is empty', () => {
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
});
