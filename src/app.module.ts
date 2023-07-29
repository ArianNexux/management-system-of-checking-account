import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstituitionModule } from './instituition/instituition.module';
import { EmployeeModule } from './employee/employee.module';
import { ExpenditureModule } from './expenditure/expenditure.module';
import { SupplierModule } from './supplier/supplier.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DashboardControllerController } from './dashboard-controller/dashboard-controller.controller';
import { ExpenditureCategoryModule } from './expenditure-categories/expenditure-category.module';
import InstituitionPrismaRepository from './@core/modules/instituition/repository/prisma/instituition.repository';
import SupplierRepository from './@core/modules/transaction/repository/prisma/supplier.repository';
import ExpenditureRepository from './@core/modules/transaction/repository/prisma/expenditure.repository';
import TransactionRepository from './@core/modules/transaction/repository/prisma/transaction.repository';
import EmployeeRepository from './@core/modules/instituition/repository/prisma/employee.repository';

@Module({
  imports: [
    InstituitionModule,
    EmployeeModule,
    ExpenditureModule,
    SupplierModule,
    TransactionModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads'
    }),
    ExpenditureCategoryModule
  ],

  controllers: [AppController, DashboardControllerController],
  providers: [
    AppService,
    EmployeeRepository,
    SupplierRepository,
    ExpenditureRepository,
    TransactionRepository
  ],
})
export class AppModule { }
