import { Module } from '@nestjs/common';
import { InstituitionService } from './instituition.service';
import { InstituitionController } from './instituition.controller';
import InstituitionPrismaRepository from '../@core/modules/instituition/repository/prisma/instituition.repository';
import AddInstituitionUseCase from '../@core/modules/instituition/usecase/add-instituition.usecase';
import InstituitionGateway from '../@core/modules/instituition/gateway/instituition.gateway';
import FindInstituitionUseCase from '../@core/modules/instituition/usecase/find-instituition.usecase';
import UpdateInstituitionUseCase from '../@core/modules/instituition/usecase/update-instituition.usecase';

@Module({
  controllers: [InstituitionController],
  providers: [
    InstituitionService,
    {
      provide: InstituitionPrismaRepository,
      useClass: InstituitionPrismaRepository
    },
    {
      provide: AddInstituitionUseCase,
      useFactory: (repository: InstituitionGateway) => {
        return new AddInstituitionUseCase(repository)
      },
      inject: [InstituitionPrismaRepository]
    },
    {
      provide: FindInstituitionUseCase,
      useFactory: (repository: InstituitionGateway) => {
        return new FindInstituitionUseCase(repository)
      },
      inject: [InstituitionPrismaRepository]
    },
    {
      provide: UpdateInstituitionUseCase,
      useFactory: (repository: InstituitionGateway) => {
        return new UpdateInstituitionUseCase(repository)
      },
      inject: [InstituitionPrismaRepository]
    }
  ]
})
export class InstituitionModule { }
