import { Test, TestingModule } from '@nestjs/testing';
import { DlcService } from './dlc.service';

describe('DlcService', () => {
  let service: DlcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DlcService],
    }).compile();

    service = module.get<DlcService>(DlcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
