import { Module } from '@nestjs/common';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { ExpenditureCategoryController } from './expenditure-category.controller';
import ExpenditureCategoryRepository from '../@core/modules/transaction/repository/prisma/expenditure-category.repository';
import AddExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/add-expenditure-category.usecase';
import DeleteExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/delete-expenditure-category.usecase';
import ListExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/list-expenditure-category.usecase';
import UpdateExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/update-expenditure-category.usecase';
import FindExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/find-expenditure-category.usecase';

@Module({
  controllers: [ExpenditureCategoryController],
  providers: [
    ExpenditureCategoryService,
    ExpenditureCategoryRepository,
    {
      provide: AddExpenditureCategoryUseCase,
      useFactory: (repo: ExpenditureCategoryRepository) => {
        return new AddExpenditureCategoryUseCase(repo);
      },
      inject: [ExpenditureCategoryRepository]
    },
    {
      provide: UpdateExpenditureCategoryUseCase,
      useFactory: (repo: ExpenditureCategoryRepository) => {
        return new UpdateExpenditureCategoryUseCase(repo);
      },
      inject: [ExpenditureCategoryRepository]
    },
    {
      provide: DeleteExpenditureCategoryUseCase,
      useFactory: (repo: ExpenditureCategoryRepository) => {
        return new DeleteExpenditureCategoryUseCase(repo);
      },
      inject: [ExpenditureCategoryRepository]
    },
    {
      provide: ListExpenditureCategoryUseCase,
      useFactory: (repo: ExpenditureCategoryRepository) => {
        return new ListExpenditureCategoryUseCase(repo);
      },
      inject: [ExpenditureCategoryRepository]
    },
    {
      provide: FindExpenditureCategoryUseCase,
      useFactory: (repo: ExpenditureCategoryRepository) => {
        return new FindExpenditureCategoryUseCase(repo);
      },
      inject: [ExpenditureCategoryRepository]
    }
  ]
})
export class ExpenditureCategoryModule { }
