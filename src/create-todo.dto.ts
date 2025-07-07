import { TodoStatus } from "./todo.entity";

export class CreateTodoDto {
    title: string;
    description: string;
    status?: TodoStatus; // Optional, will default to TodoStatus.TODO if not provided
  }

  