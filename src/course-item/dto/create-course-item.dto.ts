import { IsOptional, IsString } from "class-validator"

export class CreateCourseItemDto {
    @IsString()
    type: ItemType;

    @IsString()
    name: string;

    @IsOptional()
    video: string;

    @IsOptional()
    questions: Question[];
}

export enum ItemType {
    exam = 'exam',
    lesson = 'lesson',
}

export type Question = {
    question: string,
    choices: Choice[],
}

type Choice = {
    content: string,
    isCorrect: boolean,
}
