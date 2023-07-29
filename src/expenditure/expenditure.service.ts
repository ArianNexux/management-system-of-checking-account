import { Injectable } from '@nestjs/common';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import AddExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/add-expenditure.usecase';
import DeleteExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/delete-expenditure.usecase';
import FindExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/find-expenditure.usecase';
import ListExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/list-expenditure.usecase';
import UpdateExpenditureUseCase from '../@core/modules/transaction/usecase/expenditure/update-expenditure.usecase';

@Injectable()
export class ExpenditureService {
  constructor(
    private addExpenditure: AddExpenditureUseCase,
    private updateExpenditure: UpdateExpenditureUseCase,
    private listExpenditure: ListExpenditureUseCase,
    private findExpenditure: FindExpenditureUseCase,
    private deleteExpenditure: DeleteExpenditureUseCase
  ) {

  }
  create(createExpenditureDto: CreateExpenditureDto) {
    return this.addExpenditure.execute(createExpenditureDto)
  }

  findAll(input: { limit: number, page: number, typeOfExpenditure: any }) {
    console.log(input.typeOfExpenditure)
    return this.listExpenditure.execute({ ...input.typeOfExpenditure });
  }

  findOne(id: string) {
    return this.findExpenditure.execute({ id });
  }

  update(id: string, updateExpenditureDto: UpdateExpenditureDto) {
    return this.updateExpenditure.execute({ id, ...updateExpenditureDto });
  }

  remove(id: string) {
    return this.deleteExpenditure.execute({ id });
  }
}
