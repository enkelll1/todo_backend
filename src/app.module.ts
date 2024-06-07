import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { databaseProviders } from './database/database.providers'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { TodoModule } from './todo/todo.module'

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), TodoModule],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
  exports: [...databaseProviders],
})
export class AppModule {}
