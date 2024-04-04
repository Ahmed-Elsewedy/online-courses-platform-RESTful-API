import { Test, TestingModule } from '@nestjs/testing';
import { CourseItemController } from './course-item.controller';
import { CourseItemService } from './course-item.service';

describe('CourseItemController', () => {
  let controller: CourseItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseItemController],
      providers: [CourseItemService],
    }).compile();

    controller = module.get<CourseItemController>(CourseItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
