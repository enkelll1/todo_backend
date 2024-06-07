import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { DatabaseModule } from '../database/database.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.EXPIRES_IN}d` },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
