import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenditureCategoryDto } from './create-expenditure-category.dto';

export class UpdateExpenditureCategoryDto extends PartialType(CreateExpenditureCategoryDto) {
    name: string;
}
