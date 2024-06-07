import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { userProviders } from './user/user.provider'
import { ConfigModule } from '@nestjs/config'
import { todoProviders } from './todo/todo.provider'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders, ...userProviders, ...todoProviders],
  exports: [...databaseProviders, ...userProviders, ...todoProviders],
})
export class DatabaseModule {}
