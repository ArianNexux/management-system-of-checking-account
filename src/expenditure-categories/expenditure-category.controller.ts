import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { CreateExpenditureCategoryDto } from './dto/create-expenditure-category.dto';
import { Request, Response } from 'express';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { UpdateExpenditureCategoryDto } from './dto/update-expenditure-category.dto';
@Controller('expenditure-category')
export class ExpenditureCategoryController {
  constructor(private readonly expenditureCategoryService: ExpenditureCategoryService) { }

  @Post()
  async create(
    @Body() createExpenditureDto: CreateExpenditureCategoryDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureCategoryService.create(createExpenditureDto);
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
      const response = await this.expenditureCategoryService.findAll({ limit, page });
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
      const response = await this.expenditureCategoryService.findOne(id);
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
    @Body() updateExpenditureDto: UpdateExpenditureCategoryDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.expenditureCategoryService.update(id, updateExpenditureDto);
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
      const response = await this.expenditureCategoryService.remove(id);
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
