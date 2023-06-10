import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { ExpenditureService } from './expenditure.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { Request, Response } from 'express';
@Controller('expenditure')
export class ExpenditureController {
  constructor(private readonly expenditureService: ExpenditureService) { }

  @Post()
  async create(
    @Body() createExpenditureDto: CreateExpenditureDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureService.create(createExpenditureDto);
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(400).json({
        message: err.toString()
      })
    }
  }

  @Get()
  async findAll(
    @Query() limit: number,
    @Query() page: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureService.findAll({ limit, page });
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(400).json({
        message: err.toString()
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureService.findOne(id);
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
    @Body() updateExpenditureDto: UpdateExpenditureDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureService.update(id, updateExpenditureDto);
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(400).json({
        message: err.toString()
      })
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureService.remove(id);
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
