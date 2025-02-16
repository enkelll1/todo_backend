import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { User } from '../database/user/user.entity'
import { Crypt } from '../utils/crypt'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(req: RegisterUserDto): Promise<User> {
    if (req.password != req.repeatPassword) {
      throw new BadRequestException('Password mismatch')
    }

    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: req.email },
    })
    if (userAlreadyExists) {
      throw new ConflictException('This user already exists')
    }

    const user = await this.userRepository.create({
      username: req.username,
      email: req.email,
      password: await Crypt.hash(req.password),
    })
    return user
  }

  async login(req: LoginUserDto): Promise<{ accessToken: string }> {
    const user: User = await this.validateUser(req)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    const payload = {
      id: user.id,
      email: user.email,
    }
    const token = this.jwtService.sign(payload)
    return {
      accessToken: token,
    }
  }

  private async validateUser(req: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: req.email },
    })
    if (!user) {
      return null
    }

    const valid = await Crypt.compare(req.password, user.password)
    if (valid) {
      return user
    }

    return null
  }
}
