import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { InstituitionService } from './instituition.service';
import { CreateInstituitionDto } from './dto/create-instituition.dto';
import { UpdateInstituitionDto } from './dto/update-instituition.dto';

@Controller('instituition')
export class InstituitionController {
  constructor(private readonly instituitionService: InstituitionService) { }

  @Post()
  async create(
    @Body() createInstituitionDto: CreateInstituitionDto,
    @Req() req: Request,
    @Res() res: Response) {
    try {
      const response = await this.instituitionService.create(createInstituitionDto);
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(404).json({
        message: err.toString()
      })
    }
  }
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response) {
    try {
      const response = await this.instituitionService.findOne(id);
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(400).json({
        message: err.toString()
      })
    }

  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstituitionDto: UpdateInstituitionDto,
    @Res() res: Response
  ) {
    try {
      const response = await this.instituitionService.update(id, updateInstituitionDto);
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(400).json({
        message: err.toString()
      })
    }
  }

}