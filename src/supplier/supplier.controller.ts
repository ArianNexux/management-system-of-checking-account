import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Response, Request } from 'express'
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.supplierService.create(createSupplierDto);
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
      const response = await this.supplierService.findAll({ limit, page });
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
      const response = await this.supplierService.findOne(id);
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
    @Body() updateSupplierDto: UpdateSupplierDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.supplierService.update(id, updateSupplierDto);
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
      const response = await this.supplierService.remove(id);
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
