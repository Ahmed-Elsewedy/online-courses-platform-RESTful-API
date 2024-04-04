import { Test, TestingModule } from '@nestjs/testing';
import { CourseItemService } from './course-item.service';

describe('CourseItemService', () => {
  let service: CourseItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseItemService],
    }).compile();

    service = module.get<CourseItemService>(CourseItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
