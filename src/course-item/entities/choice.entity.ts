import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

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