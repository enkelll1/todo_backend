import {Controller, Post, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {User} from "../database/user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('register')
    async register(@Request() req ): Promise<User> {
        const reqBody: {username: string, email: string, password: string, repeatPassword: string} = req.body
        return this.authService.register(reqBody);
    }

    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }
}
