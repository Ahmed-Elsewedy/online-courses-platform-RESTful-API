import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseItemDto } from './create-course-item.dto';

export class UpdateCourseItemDto extends PartialType(CreateCourseItemDto) {
}
