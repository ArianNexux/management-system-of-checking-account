import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import AddEmployeeUseCase from '../@core/modules/instituition/usecase/add-employee.usecase';
import EmployeeRepository from '../@core/modules/instituition/repository/prisma/employee.repository';
import DeleteEmployeeUseCase from '../@core/modules/instituition/usecase/delete-employee.usecase';
import FindEmployeeUseCase from '../@core/modules/instituition/usecase/find-employee.usecase';
import ListEmployeeUseCase from '../@core/modules/instituition/usecase/list-employee.usecase';
import UpdateEmployeeUseCase from '../@core/modules/instituition/usecase/update-employee.usecase';
import BcryptEncryptor from 'src/@core/modules/instituition/infrastructure/bcrypt';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    BcryptEncryptor,
    {
      provide: AddEmployeeUseCase,
      useFactory: (repository: EmployeeRepository, encryptor: BcryptEncryptor) => {
        return new AddEmployeeUseCase(repository, encryptor);
      },
      inject: [EmployeeRepository, BcryptEncryptor]
    },
    {
      provide: FindEmployeeUseCase,
      useFactory: (repository: EmployeeRepository) => {
        return new FindEmployeeUseCase(repository);
      },
      inject: [EmployeeRepository]
    },
    {
      provide: DeleteEmployeeUseCase,
      useFactory: (repository: EmployeeRepository) => {
        return new DeleteEmployeeUseCase(repository);
      },
      inject: [EmployeeRepository]
    },
    {
      provide: ListEmployeeUseCase,
      useFactory: (repository: EmployeeRepository) => {
        return new ListEmployeeUseCase(repository);
      },
      inject: [EmployeeRepository]
    },
    {
      provide: UpdateEmployeeUseCase,
      useFactory: (repository: EmployeeRepository, encryptor: BcryptEncryptor) => {
        return new UpdateEmployeeUseCase(repository, encryptor);
      },
      inject: [EmployeeRepository, BcryptEncryptor]
    }
  ],

})
export class EmployeeModule { }
