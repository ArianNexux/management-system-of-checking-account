import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
    position: string;
    password: string
}
