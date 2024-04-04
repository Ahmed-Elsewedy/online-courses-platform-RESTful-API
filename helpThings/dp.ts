import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

// User entity
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    username: string;

    // Add more columns as per your user model
}

// Instructor entity
@Entity()
export class Instructor {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column({ default: true })
    full_time: boolean;

    @Column()
    total_learners: number;
}

// Learner entity
@Entity()
export class Learner {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column({ length: 20 })
    occupation: string;

    @Column()
    social_link: string;
}

// Course entity
@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 30, default: 'online course' })
    name: string;

    @Column()
    image: string;

    @Column({ length: 1000 })
    description: string;

    @Column({ nullable: true })
    pub_date: Date;

    @ManyToMany(() => Instructor)
    @JoinTable()
    instructors: Instructor[];

    @Column({ default: 0 })
    total_enrollment: number;

    // Assuming you have a boolean column in your database to check if the user is enrolled in a course
    is_enrolled: boolean;
}

// Lesson entity
@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, default: 'title' })
    title: string;

    @Column({ default: 0 })
    order: number;

    @ManyToOne(() => Course)
    course: Course;

    @Column('text')
    content: string;
}

// Enrollment entity
@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Course)
    course: Course;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date_enrolled: Date;

    @Column({ length: 5, default: 'audit' })
    mode: string;

    @Column({ default: 5.0 })
    rating: number;
}

// Question entity
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course)
    course: Course;

    @Column({ length: 200 })
    content: string;

    @Column({ default: 50 })
    grade: number;

    // Method to calculate if the learner gets the score of the question
    is_get_score(selectedIds: number[]): boolean {
        // Implementation
        return true;
    }
}

// Choice entity
@Entity()
export class Choice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Question)
    question: Question;

    @Column({ length: 200 })
    content: string;

    @Column({ default: false })
    is_correct: boolean;
}

// Submission entity
@Entity()
export class Submission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Enrollment)
    enrollment: Enrollment;

    // Assuming you need ManyToMany relationship with Choice
    @ManyToMany(() => Choice)
    @JoinTable()
    choices: Choice[];
}
