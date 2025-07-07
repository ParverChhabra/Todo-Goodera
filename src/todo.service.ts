import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,ILike,FindOptionsOrder } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // async createSampleTodo(): Promise<Todo> {
  //   const sample = this.todoRepository.create({
  //     title: 'Sample Todo',
  //     description: 'This is a sample todo item.',
  //     status: TodoStatus.TODO,
  //   });
  //   return this.todoRepository.save(sample);

  // }

  

  // Add this method for fetching all todos
  // async findAll(): Promise<Todo[]> {
  //   return this.todoRepository.find();
  // }

  async findAll(

    search?: string,
    
    sortBy?: 'createdAt' | 'updatedAt'  ,
    sortOrder?: 'ASC' | 'DESC' ,

  ): Promise<Todo[]> {
    sortBy = sortBy ?? 'createdAt';
    sortOrder = sortOrder ?? 'DESC';
    const where = search
      ? { title: ILike(`%${search}%`) }
      : {};

    const order: FindOptionsOrder<Todo> = {};
    if (sortBy) {
      order[sortBy] = sortOrder;
    }

    return this.todoRepository.find({
      where,
      order,
    });
  }
  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, updateTodoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
