import { PartialType } from '@nestjs/mapped-types';
import { CreateInstituitionDto } from './create-instituition.dto';

export class UpdateInstituitionDto extends PartialType(CreateInstituitionDto) {
    name: string
    logo: string
    heightLogo: number
    widthLogo: number
    title1: string
    title2: string
}
