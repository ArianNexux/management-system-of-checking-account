import { Module } from '@nestjs/common';
import { ExpenditureService } from './expenditure.service';
import { ExpenditureController } from './expenditure.controller';
import ExpenditureRepository from '../@core/modules/transaction/repository/prisma/expenditure.repository';
import AddExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/add-expenditure.usecase';
import DeleteExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/delete-expenditure.usecase';
import ListExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/list-expenditure.usecase';
import UpdateExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/update-expenditure.usecase';
import FindExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/find-expenditure.usecase';

@Module({
  controllers: [ExpenditureController],
  providers: [
    ExpenditureService,
    ExpenditureRepository,
    {
      provide: AddExpenditureUseCase,
      useFactory: (repo: ExpenditureRepository) => {
        return new AddExpenditureUseCase(repo);
      },
      inject: [ExpenditureRepository]
    },
    {
      provide: UpdateExpenditureUseCase,
      useFactory: (repo: ExpenditureRepository) => {
        return new UpdateExpenditureUseCase(repo);
      },
      inject: [ExpenditureRepository]
    },
    {
      provide: DeleteExpenditureUseCase,
      useFactory: (repo: ExpenditureRepository) => {
        return new DeleteExpenditureUseCase(repo);
      },
      inject: [ExpenditureRepository]
    },
    {
      provide: ListExpenditureUseCase,
      useFactory: (repo: ExpenditureRepository) => {
        return new ListExpenditureUseCase(repo);
      },
      inject: [ExpenditureRepository]
    },
    {
      provide: FindExpenditureUseCase,
      useFactory: (repo: ExpenditureRepository) => {
        return new FindExpenditureUseCase(repo);
      },
      inject: [ExpenditureRepository]
    }
  ]
})
export class ExpenditureModule { }
