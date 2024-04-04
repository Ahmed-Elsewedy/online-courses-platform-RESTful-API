import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CourseService } from '../course.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private readonly courseService: CourseService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const courseId = request.params.course;

    const userId = request.user.id;

    const isEnrolled = await this.courseService.isUserEnrolled(courseId, userId);

    return isEnrolled;
  }
}
