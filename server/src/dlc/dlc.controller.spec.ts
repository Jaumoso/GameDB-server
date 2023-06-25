import { Test, TestingModule } from '@nestjs/testing';
import { DlcController } from './dlc.controller';

describe('DlcController', () => {
  let controller: DlcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DlcController],
    }).compile();

    controller = module.get<DlcController>(DlcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
