import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { AuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user)
  }

  @Get()
  findAll(@Request() req) {
    return this.todoService.findAll(req.user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id)
  }
}
