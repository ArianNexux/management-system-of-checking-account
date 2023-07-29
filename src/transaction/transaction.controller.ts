import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response, Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  @UseInterceptors(FileInterceptor("ticket", {
    storage: diskStorage({
      destination: "./public",
      filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      }
    })
  })
  )
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const response = await this.transactionService.create({
        ...createTransactionDto,
        ticket: file.filename
      });
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
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.transactionService.findAll({ limit, page });
      return res.status(200).json({
        data: response
      })
    } catch (err) {
      return res.status(400).json({
        message: err.toString()
      })
    }
  }
  @Get("/supplier/:supplierId")
  async findBySupplier(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('beginDate') beginDate: string,
    @Query('endDate') endDate: string,
    @Param('supplierId') supplierId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.transactionService.findBySupplier({ limit, page, supplierId: supplierId.toString(), beginDate: beginDate.toString(), endDate: endDate.toString() });
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
      const response = await this.transactionService.findOne(id);
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
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const response = await this.transactionService.update(id, updateTransactionDto);
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
      const response = await this.transactionService.remove(id);
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
