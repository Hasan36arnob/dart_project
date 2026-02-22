import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getHello(): string {
    return 'Hello from NestJS backend!';
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async createTodo(title: string): Promise<Todo> {
    const todo = this.todoRepository.create({ title });
    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, completed: boolean): Promise<Todo> {
    await this.todoRepository.update(id, { completed });
    return this.todoRepository.findOne({ where: { id } });
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}