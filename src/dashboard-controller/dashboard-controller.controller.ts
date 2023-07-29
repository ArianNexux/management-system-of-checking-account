import { Controller, Get } from '@nestjs/common';
import EmployeeRepository from 'src/@core/modules/instituition/repository/prisma/employee.repository';
import InstituitionPrismaRepository from 'src/@core/modules/instituition/repository/prisma/instituition.repository';
import ExpenditureRepository from 'src/@core/modules/transaction/repository/prisma/expenditure.repository';
import SupplierRepository from 'src/@core/modules/transaction/repository/prisma/supplier.repository';
import TransactionRepository from 'src/@core/modules/transaction/repository/prisma/transaction.repository';

@Controller('dashboard')
export class DashboardControllerController {
    constructor(
        private transacionRepository: TransactionRepository,
        private supplierRepository: SupplierRepository,
        private expenditureRepository: ExpenditureRepository,
        private employeesRepository: EmployeeRepository
    ) {

    }
    @Get('/')
    async index() {
        return {
            employees: await this.employeesRepository.count(),
            supplier: await this.supplierRepository.count(),
            expenditure: await this.expenditureRepository.count(),
            transaction: await this.transacionRepository.count()
        }
    }
}
