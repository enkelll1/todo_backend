import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from '../database/todo/todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo,
  ) {}
  async create(
    createTodoDto: CreateTodoDto,
    user: { id: string },
  ): Promise<Todo> {
    try {
      const todo = await this.todoRepository.create({
        userId: user.id,
        description: createTodoDto.description,
      })
      return todo
    } catch (e) {
      console.dir(e, { depth: 6 })
      throw new BadRequestException('Failed to create todo')
    }
  }

  async findAll(user: { id: string }): Promise<Todo[]> {
    try {
      const todos = await this.todoRepository.findAll({
        where: { userId: user.id },
      })
      return todos
    } catch (e) {
      console.dir(e, { depth: 6 })
      throw new BadRequestException('Failed to get all todos')
    }
  }

  async findOne(id: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({
        where: { id: id },
      })
      return todo
    } catch (e) {
      console.dir(e, { depth: 6 })
      throw new BadRequestException('Failed to get one todo')
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const [numberOfAffectedRows, [updatedTodo]] =
        await this.todoRepository.update(
          {
            description: updateTodoDto.description,
          },
          {
            where: { id: id },
            returning: true,
          },
        )
      return updatedTodo.dataValues
    } catch (e) {
      console.dir(e, { depth: 6 })
      throw new BadRequestException('Failed to update todo')
    }
  }

  async remove(id: number): Promise<{ ok: boolean }> {
    try {
      await this.todoRepository.destroy({ where: { id: id } })
      return { ok: true }
    } catch (e) {
      console.dir(e, { depth: 6 })
      throw new BadRequestException('Failed to delete todo')
    }
  }
}
