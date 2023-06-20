import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import AddTransactionUseCase from '../@core/modules/transaction/usecase/transaction/add-transaction.usecase';
import DeleteTransactionUseCase from '../@core/modules/transaction/usecase/transaction/delete-transaction.usecase';
import FindTransactionUseCase from '../@core/modules/transaction/usecase/transaction/find-transaction.usecase';
import ListTransactionUseCase from '../@core/modules/transaction/usecase/transaction/list-transaction.usecase';
import UpdateTransactionUseCase from '../@core/modules/transaction/usecase/transaction/update-transaction.usecase';

@Injectable()
export class TransactionService {
  constructor(
    private addTransaction: AddTransactionUseCase,
    private updateTransaction: UpdateTransactionUseCase,
    private listTransaction: ListTransactionUseCase,
    private findTransaction: FindTransactionUseCase,
    private deleteTransaction: DeleteTransactionUseCase
  ) {

  }
  create(createTransactionDto: CreateTransactionDto) {
    return this.addTransaction.execute(createTransactionDto)
  }

  findAll(input: { limit: number, page: number }) {
    return this.listTransaction.execute({ ...input });
  }

  findBySupplier(input: { limit: number, page: number, supplierId: string, beginDate: string, endDate: string }) {
    return this.listTransaction.execute({ ...input });
  }
  findOne(id: string) {
    return this.findTransaction.execute({ id });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.updateTransaction.execute({ id, ...updateTransactionDto });
  }

  remove(id: string) {
    return this.deleteTransaction.execute({ id });
  }
}
