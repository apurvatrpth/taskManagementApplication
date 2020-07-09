import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    let task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException('No such task exists!');
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    let found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
    return this.tasks;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
