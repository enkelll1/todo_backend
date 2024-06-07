import { Body, Controller, Post, Request } from '@nestjs/common'
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
  async login(@Request() req) {
    return this.authService.login(req.body)
  }
}
