import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from 'src/auth/interface/role';
import { AuthenticateDto } from 'src/auth/dto/authenticate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async login(email: string, password: string): Promise<IAuthenticate> {
        const user = await this.userRepository.findOneBy({ email })

        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new NotFoundException('Invalid Credentials')
        delete user.password
        const token = sign({ ...user }, process.env.JWT_SECRET);
        return { user, token };
    }

    async register(user: AuthenticateDto): Promise<IAuthenticate> {

        const existingUser = await this.userRepository.findOneBy({ email: user.email });
        if (existingUser) {
            throw new Error('Email address is already exist');
        }

        user.password = await bcrypt.hash(user.password, 10);

        const userReg = await this.userRepository.save(user)
        delete userReg.password
        const token = sign({ ...user }, process.env.JWT_SECRET);
        return { user: userReg, token };
    }

    async findAll() {
        const users = await this.userRepository.find()
        return users;
    }

    updateProfile(user, id) {
        if (user?.role)
            delete user.role
        return this.userRepository.update(id, user)
    }

    async updatePassword(data, id) {

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const passwordMatches = await bcrypt.compare(data.password, user.password);

        if (!passwordMatches) {
            throw new UnauthorizedException('Old password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
        return this.userRepository.update(id, { password: data.hashedNewPassword });
    }

    deleteUser(id) {
        return this.userRepository.delete(id)
    }
}

