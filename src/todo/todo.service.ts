import { Inject, Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { JwtService } from '@nestjs/jwt'
import { Todo } from '../database/todo/todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo,
    private jwtService: JwtService,
  ) {}
  async create(
    createTodoDto: CreateTodoDto,
    user: { id: string },
  ): Promise<Todo> {
    const todo = await this.todoRepository.create({
      userId: user.id,
      description: createTodoDto.description,
    })
    return todo
  }

  async findAll(user: { id: string }): Promise<Todo[]> {
    const todos = await this.todoRepository.findAll({
      where: { userId: user.id },
    })
    return todos
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id: id },
    })
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(
      {
        description: updateTodoDto.description,
      },
      {
        where: { id: id },
      },
    )
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
      },
    })
    return todo
  }

  async remove(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: id } })
    await this.todoRepository.destroy({ where: { id: id } })
    return todo
  }
}
