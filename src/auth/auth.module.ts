import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {DatabaseModule} from "../database/database.module";
import {User} from "../database/user/user.entity";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: `${process.env.EXPIRES_IN}d`},
        }),
        ConfigModule.forRoot(),
        DatabaseModule
    ],
    controllers: [AuthController],
    providers: [AuthService, User]
})
export class AuthModule {
}
