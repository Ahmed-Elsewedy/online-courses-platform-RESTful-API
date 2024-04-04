import { Course } from "src/course/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { Exam } from "./exam.entity";

export enum CourseItemType {
    Lesson = "lesson",
    Exam = "exam",
}

@Entity()
export class CourseItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    order: number;

    @Column({
        type: 'enum',
        enum: CourseItemType,
        default: CourseItemType.Lesson,
    })
    type: CourseItemType;

    @ManyToOne(() => Course, course => course.items)
    course: Course;

    @ManyToOne(() => Lesson, { nullable: true, cascade: true, onDelete: 'CASCADE' })
    lesson: Lesson;

    @ManyToOne(() => Exam, { nullable: true, cascade: true, onDelete: 'CASCADE' })
    exam: Exam;
}
