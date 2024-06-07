import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../database/user/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body): Promise<User> {
    return this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body)
  }
}
