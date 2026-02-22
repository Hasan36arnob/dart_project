import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('todos')
  async getAllTodos() {
    return this.appService.getAllTodos();
  }

  @Post('todos')
  async createTodo(@Body() body: { title: string }) {
    return this.appService.createTodo(body.title);
  }

  @Put('todos/:id')
  async updateTodo(@Param('id') id: string, @Body() body: { completed: boolean }) {
    return this.appService.updateTodo(parseInt(id), body.completed);
  }

  @Delete('todos/:id')
  async deleteTodo(@Param('id') id: string) {
    return this.appService.deleteTodo(parseInt(id));
  }
}
