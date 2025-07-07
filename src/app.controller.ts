import { Controller, Get , Post,Put,Delete,Param,Body,Query} from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

import { TodoService } from './todo.service'; // Import the correct service

@Controller('todos')
export class AppController {
  constructor(private readonly todoService: TodoService) {}
  
  @Get()
  async getAllTodos(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: 'createdAt' | 'updatedAt',
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    return this.todoService.findAll(search, sortBy, sortOrder);
  }
   
  

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(+id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(+id);
  }

  // @Post('sample')
  // async createSampleTodo() {
  //   return this.todoService.createSampleTodo();
  // }

}