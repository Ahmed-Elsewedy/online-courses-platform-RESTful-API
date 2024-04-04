import { Role } from "src/auth/interface/role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @Column({
        type: "enum",
        enum: Role,
        default: Role.User
    })
    role: Role;
}