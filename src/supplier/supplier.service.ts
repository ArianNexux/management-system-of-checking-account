import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import AddSupplierUseCase from '../@core/modules/transaction/usecase/supplier/add-supplier.usecase';
import DeleteSupplierUseCase from '../@core/modules/transaction/usecase/supplier/delete-supplier.usecase';
import FindSupplierUseCase from '../@core/modules/transaction/usecase/supplier/find-supplier.usecase';
import ListSupplierUseCase from '../@core/modules/transaction/usecase/supplier/list-supplier.usecase';
import UpdateSupplierUseCase from '../@core/modules/transaction/usecase/supplier/update-supplier.usecase';

@Injectable()
export class SupplierService {
  constructor(
    private addSupplier: AddSupplierUseCase,
    private updateSupplier: UpdateSupplierUseCase,
    private listSupplier: ListSupplierUseCase,
    private findSupplier: FindSupplierUseCase,
    private deleteSupplier: DeleteSupplierUseCase
  ) {

  }
  create(createSupplierDto: CreateSupplierDto) {
    return this.addSupplier.execute(createSupplierDto)
  }

  findAll(input: { limit: number, page: number }) {

    return this.listSupplier.execute(input);
  }

  findOne(id: string) {
    return this.findSupplier.execute({ id });
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return this.updateSupplier.execute({ id, ...updateSupplierDto });
  }

  remove(id: string) {
    return this.deleteSupplier.execute({ id });
  }
}
