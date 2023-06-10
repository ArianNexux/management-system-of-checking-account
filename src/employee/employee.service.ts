import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import AddEmployeeUseCase from '../@core/modules/instituition/usecase/add-employee.usecase';
import DeleteEmployeeUseCase from '../@core/modules/instituition/usecase/delete-employee.usecase';
import FindEmployeeUseCase from '../@core/modules/instituition/usecase/find-employee.usecase';
import ListEmployeeUseCase from '../@core/modules/instituition/usecase/list-employee.usecase';
import UpdateEmployeeUseCase from '../@core/modules/instituition/usecase/update-employee.usecase';

@Injectable()
export class EmployeeService {
  constructor(
    private addEmployeeUseCase: AddEmployeeUseCase,
    private deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private listEmployeeUseCase: ListEmployeeUseCase,
    private updateEmployeeUseCase: UpdateEmployeeUseCase,
    private findEmployeeUseCase: FindEmployeeUseCase
  ) {

  }
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.addEmployeeUseCase.execute(createEmployeeDto)
  }

  findAll(pagination: { page: number, limit: number }) {
    return this.listEmployeeUseCase.execute(pagination);
  }

  findOne(id: string) {
    return this.findEmployeeUseCase.execute({ id });
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.updateEmployeeUseCase.execute({ id, ...updateEmployeeDto });
  }

  remove(id: string) {
    return this.deleteEmployeeUseCase.execute({ id });
  }
}
