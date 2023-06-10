import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstituitionModule } from './instituition/instituition.module';
import { EmployeeModule } from './employee/employee.module';
import { ExpenditureModule } from './expenditure/expenditure.module';
import { SupplierModule } from './supplier/supplier.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InstituitionModule, EmployeeModule, ExpenditureModule, SupplierModule, TransactionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
