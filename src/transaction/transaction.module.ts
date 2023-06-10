import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import TransactionRepository from '../@core/modules/transaction/repository/prisma/transaction.repository';
import AddTransactionUseCase from '../@core/modules/transaction/usecase/transaction/add-transaction.usecase';
import DeleteTransactionUseCase from '../@core/modules/transaction/usecase/transaction/delete-transaction.usecase';
import FindTransactionUseCase from '../@core/modules/transaction/usecase/transaction/find-transaction.usecase';
import ListTransactionUseCase from '../@core/modules/transaction/usecase/transaction/list-transaction.usecase';
import UpdateTransactionUseCase from '../@core/modules/transaction/usecase/transaction/update-transaction.usecase';
import SupplierRepository from '../@core/modules/transaction/repository/prisma/supplier.repository';
import ExpenditureRepository from '../@core/modules/transaction/repository/prisma/expenditure.repository';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService,
    TransactionRepository,
    SupplierRepository,
    ExpenditureRepository,
    {
      provide: AddTransactionUseCase,
      useFactory: (repo: TransactionRepository, supplierRepo: SupplierRepository, expenditureRepo: ExpenditureRepository) => {
        return new AddTransactionUseCase(repo, supplierRepo, expenditureRepo)
      },
      inject: [TransactionRepository, SupplierRepository, ExpenditureRepository]
    },
    {
      provide: UpdateTransactionUseCase,
      useFactory: (repo: TransactionRepository, supplierRepo: SupplierRepository, expenditureRepo: ExpenditureRepository) => {
        return new UpdateTransactionUseCase(repo, supplierRepo, expenditureRepo)
      },
      inject: [TransactionRepository, SupplierRepository, ExpenditureRepository]
    },
    {
      provide: FindTransactionUseCase,
      useFactory: (repo: TransactionRepository) => {
        return new FindTransactionUseCase(repo)
      },
      inject: [TransactionRepository]
    },
    {
      provide: ListTransactionUseCase,
      useFactory: (repo: TransactionRepository) => {
        return new ListTransactionUseCase(repo)
      },
      inject: [TransactionRepository]
    },
    {
      provide: DeleteTransactionUseCase,
      useFactory: (repo: TransactionRepository) => {
        return new DeleteTransactionUseCase(repo)
      },
      inject: [TransactionRepository]
    }
  ]
})
export class TransactionModule { }
