import { Injectable } from '@nestjs/common';
import { CreateInstituitionDto } from './dto/create-instituition.dto';
import { UpdateInstituitionDto } from './dto/update-instituition.dto';
import AddInstituitionUseCase from '../@core/modules/instituition/usecase/add-instituition.usecase';
import FindInstituitionUseCase from '../@core/modules/instituition/usecase/find-instituition.usecase';
import UpdateInstituitionUseCase from '../@core/modules/instituition/usecase/update-instituition.usecase';

@Injectable()
export class InstituitionService {
  constructor(
    private addInstituition: AddInstituitionUseCase,
    private findInstituition: FindInstituitionUseCase,
    private updateInstituition: UpdateInstituitionUseCase,
  ) {

  }
  create(createInstituitionDto: CreateInstituitionDto) {
    return this.addInstituition.execute(createInstituitionDto)
  }

  findOne(id: string) {
    return this.findInstituition.execute({ id })
  }

  update(id: string, updateInstituitionDto: UpdateInstituitionDto) {
    return this.updateInstituition.execute({ id, ...updateInstituitionDto });
  }

}
