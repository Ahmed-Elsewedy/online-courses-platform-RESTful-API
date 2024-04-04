import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseItemDto, ItemType } from './dto/create-course-item.dto';
import { UpdateCourseItemDto } from './dto/update-course-item.dto';
import { Repository } from 'typeorm';
import { CourseItem, CourseItemType } from './entities/course-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Choice } from './entities/choice.entity';
import { Course } from 'src/course/entities/course.entity';
import { Exam } from './entities/exam.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class CourseItemService {

  constructor(
    @InjectRepository(CourseItem)
    private readonly courseItemRepository: Repository<CourseItem>,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }

  async create(createCourseItemDto: CreateCourseItemDto, courseId) {

    const course = await this.courseRepository.findOne({ where: { id: courseId }, relations: ['items'] })
    // console.log(course)
    if (!course)
      throw new Error(`Course not exist`)

    const order = course.items.length;


    if (createCourseItemDto.type == ItemType.lesson) {
      try {
        const lesson = await this.lessonRepository.save({
          name: createCourseItemDto.name,
          video: createCourseItemDto.video,
        });

        await this.courseItemRepository.save({
          type: CourseItemType.Lesson,
          lesson,
          order,
          course
        });
        return 'lesson added successfully';
      } catch (err) {
        throw new HttpException(err.message, 400);
      }
    }

    const exam = await this.examRepository.save({
      type: CourseItemType.Exam,
      name: createCourseItemDto.name,
    });

    const questions = createCourseItemDto.questions;

    for (let i = 0; i < questions.length; i++) {

      const question = questions[i].question;
      const choices = questions[i].choices;

      const newQuestion = await this.questionRepository.save({
        question,
        exam,
      });

      for (let j = 0; j < choices.length; j++) {
        const { content, isCorrect } = choices[j]

        await this.choiceRepository.save({
          content,
          isCorrect,
          question: newQuestion,
        });
      }

    }

    await this.courseItemRepository.save({
      type: CourseItemType.Exam,
      exam,
      order
    });

    return 'exam added successfully';
  }

  findAll(id: number) {
    return this.courseRepository.findOne({ where: { id }, relations: ['items'] });
  }

  async findOne(id: number, item: number) {
    const course = await this.courseRepository.findOneBy({ id })
    if (!course)
      throw new NotFoundException('Course not found');

    const courseItem = await this.courseItemRepository.findOne({ where: { id: item, course } });
    if (!courseItem)
      throw new NotFoundException('Course item not found');

    if (courseItem.type == 'lesson') {
      return await this.lessonRepository.findOneOrFail({ where: { id: courseItem.lesson.id } })
    }

    const exam = await this.examRepository.findOneOrFail({ where: { id: courseItem.exam.id }, relations: ['question', 'question.choice'] })

    return exam
  }

  async update(id: number, item: number, updateCourseItemDto: UpdateCourseItemDto) {
    const course = await this.courseRepository.findOneBy({ id })

    if (!course)
      throw new NotFoundException('Course not found');

    const itemToUpdate = await this.courseItemRepository.findOne({ where: { id: item, course } })

    if (!itemToUpdate)
      throw new HttpException('Item not found', 404)

    Object.keys(updateCourseItemDto).forEach(element => itemToUpdate[element] = updateCourseItemDto[element]);

    await this.courseItemRepository.save(itemToUpdate);
    return 'updated successfully';
  }

  async remove(id: number, item: number) {
    const course = await this.courseRepository.findOneBy({ id })

    if (!course)
      throw new NotFoundException('Course not found');

    const itemToRemove = await this.courseItemRepository.findOne({ where: { id: item, course } })

    if (!itemToRemove)
      throw new HttpException('Item not found', 404)

    this.courseItemRepository.remove(itemToRemove)

    return `romoved successfully`;
  }
}
