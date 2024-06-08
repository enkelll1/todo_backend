import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../database/user/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(body)
  }
}
