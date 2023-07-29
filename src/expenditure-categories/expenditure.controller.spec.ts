import { Test, TestingModule } from '@nestjs/testing';
import { ExpenditureController } from './expenditure-category.controller';
import { ExpenditureService } from './expenditure-category.service';

describe('ExpenditureController', () => {
  let controller: ExpenditureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenditureController],
      providers: [ExpenditureService],
    }).compile();

    controller = module.get<ExpenditureController>(ExpenditureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
