import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  create(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepository.save(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOne(id) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: ['items']
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.delete(id)
  }

  async isUserEnrolled(userId: number, courseId: number): Promise<boolean> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['user']
    });

    if (!course || !course.user) {
      return false;
    }

    return course.user.some(user => user.id === userId);
  }

  async getUserEnrollments(userId: number): Promise<Course[]> {
    return this.courseRepository.createQueryBuilder('course')
      .innerJoinAndSelect('course.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async enrollUserInCourse(courseId: number, userId: number): Promise<void> {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    course.user.push(user);
    await this.courseRepository.save(course);
  }

}
