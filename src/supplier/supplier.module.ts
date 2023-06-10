import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import SupplierRepository from '../@core/modules/transaction/repository/prisma/supplier.repository';
import AddSupplierUseCase from '../@core/modules/transaction/usecase/supplier/add-supplier.usecase';
import DeleteSupplierUseCase from '../@core/modules/transaction/usecase/supplier/delete-supplier.usecase';
import FindSupplierUseCase from '../@core/modules/transaction/usecase/supplier/find-supplier.usecase';
import ListSupplierUseCase from '../@core/modules/transaction/usecase/supplier/list-supplier.usecase';
import UpdateSupplierUseCase from '../@core/modules/transaction/usecase/supplier/update-supplier.usecase';

@Module({
  controllers: [SupplierController],
  providers: [
    SupplierService,
    SupplierRepository,
    {
      provide: AddSupplierUseCase,
      useFactory: (repo: SupplierRepository) => {
        return new AddSupplierUseCase(repo)
      },
      inject: [SupplierRepository]
    },
    {
      provide: UpdateSupplierUseCase,
      useFactory: (repo: SupplierRepository) => {
        return new UpdateSupplierUseCase(repo)
      },
      inject: [SupplierRepository]
    },
    {
      provide: FindSupplierUseCase,
      useFactory: (repo: SupplierRepository) => {
        return new FindSupplierUseCase(repo)
      },
      inject: [SupplierRepository]
    },
    {
      provide: ListSupplierUseCase,
      useFactory: (repo: SupplierRepository) => {
        return new ListSupplierUseCase(repo)
      },
      inject: [SupplierRepository]
    },
    {
      provide: DeleteSupplierUseCase,
      useFactory: (repo: SupplierRepository) => {
        return new DeleteSupplierUseCase(repo)
      },
      inject: [SupplierRepository]
    }
  ]
})
export class SupplierModule { }
