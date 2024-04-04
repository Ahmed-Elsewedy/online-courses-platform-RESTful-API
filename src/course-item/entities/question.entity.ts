import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./exam.entity";
import { Choice } from "./choice.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Exam)
    exam: Exam;

    @Column()
    question: string;

}
