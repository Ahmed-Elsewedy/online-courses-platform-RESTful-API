import { Module } from '@nestjs/common';
import { CourseItemService } from './course-item.service';
import { CourseItemController } from './course-item.controller';
import { CourseItem } from './entities/course-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Exam } from './entities/exam.entity';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';
import { Course } from 'src/course/entities/course.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CourseItem, Lesson, Exam, Question, Choice, Course])],
  controllers: [CourseItemController],
  providers: [CourseItemService],
})
export class CourseItemModule { }
