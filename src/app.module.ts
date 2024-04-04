import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { APP_PIPE } from '@nestjs/core';
import { CourseItemModule } from './course-item/course-item.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as 'postgres' | 'mysql',  // 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'oracle' | 'mssql'
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            // entities: [Payment],
            autoLoadEntities: true,
            synchronize: true, // take decision about it.
        }),
        AuthModule,
        UserModule,
        CourseModule,
        CourseItemModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtStrategy,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        }
    ],
})
export class AppModule { }
