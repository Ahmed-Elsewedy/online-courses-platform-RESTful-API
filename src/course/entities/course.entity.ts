import { CourseItem } from "src/course-item/entities/course-item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, default: 'online course' })
    name: string;

    @Column()
    image: string;

    @Column({ length: 1000 })
    description: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    pub_date: Date;

    @Column({ default: 0 })
    enrollments: number;

    @ManyToMany(() => User)
    @JoinTable()
    user: User[];

    @OneToMany(() => CourseItem, item => item.course, { cascade: true, eager: true })
    items: CourseItem[];
}