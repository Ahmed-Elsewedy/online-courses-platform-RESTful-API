import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IAuthenticate, Role } from './interface/role';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    users = [
        {
            // id: faker.datatype.uuid(),
            username: 'admin',
            password: '123',
            role: Role.Admin
        },
        {
            // id: faker.datatype.uuid(),
            username: 'ahmed',
            password: '123',
            role: Role.User
        },
        {
            // id: faker.datatype.uuid(),
            username: 'mohamed',
            password: '123',
            role: Role.User
        },
    ]


    authenticate(authenticateDto) {
        const user = this.users.find(u => u.username === authenticateDto.username && u.password === authenticateDto.password);


        if (!user) throw new NotFoundException('Invalid Credentials')


        const token = sign({ ...user }, process.env.JWT_SECRET);
        return { user, token };
    }

}
