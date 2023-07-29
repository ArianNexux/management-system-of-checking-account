import { Injectable } from '@nestjs/common';
import { CreateExpenditureCategoryDto } from './dto/create-expenditure-category.dto';
import { UpdateExpenditureCategoryDto } from './dto/update-expenditure-category.dto';
import AddExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/add-expenditure-category.usecase';
import DeleteExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/delete-expenditure-category.usecase';
import FindExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/find-expenditure-category.usecase';
import ListExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/list-expenditure-category.usecase';
import UpdateExpenditureCategoryUseCase from '../@core/modules/transaction/usecase/expenditure-category/update-expenditure-category.usecase';

@Injectable()
export class ExpenditureCategoryService {
  constructor(
    private addExpenditureCategory: AddExpenditureCategoryUseCase,
    private updateExpenditureCategory: UpdateExpenditureCategoryUseCase,
    private listExpenditureCategory: ListExpenditureCategoryUseCase,
    private findExpenditureCategory: FindExpenditureCategoryUseCase,
    private deleteExpenditureCategory: DeleteExpenditureCategoryUseCase
  ) {

  }
  async create(createExpenditureCategoryDto: CreateExpenditureCategoryDto) {
    return this.addExpenditureCategory.execute(createExpenditureCategoryDto)
  }

  async findAll(input: { limit: number, page: number }) {

    return this.listExpenditureCategory.execute({ ...input });
  }

  async findOne(id: string) {
    return this.findExpenditureCategory.execute({ id });
  }

  async update(id: string, updateExpenditureCategoryDto: UpdateExpenditureCategoryDto) {
    return this.updateExpenditureCategory.execute({
      id, ...updateExpenditureCategoryDto
    });
  }

  async remove(id: string) {
    return this.deleteExpenditureCategory.execute({ id });
  }
}
