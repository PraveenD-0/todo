import { CommonModule } from '@angular/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  constructor(private TaskService: TaskService){}

  newTask: Task = {description:"", completed: false};
  tasks:Task[] = [];
  editingTask:Task|null = null;
  updatedTask: Task = {description:"", completed: false};

  ngOnInit(): void {
      this.getAllTasks();
  }

  createTask():void{
    this.TaskService.createTask(this.newTask).subscribe((createdTask)=>{
      this.newTask = {description:"", completed: false};
      this.tasks.push(createdTask);
    });
  }

  getAllTasks(){
    this.TaskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks
    })
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.updatedTask = {...task};
  }

  updateTask():void{
    if (this.editingTask) {
      this.TaskService.updateTask(this.editingTask.id!, this.updatedTask)
      .subscribe((result) => {
        const index = this.tasks.findIndex((task)=> task.id == this.editingTask!.id)
        if (index !== -1) {
          this.tasks[index] = result;

          this.cancelEdit()
        }
      })

    }
  }

  cancelEdit() {
    this.editingTask = null;
    this.updatedTask = {description:"", completed: false};
  }

deleteTask(taskId: any) {
    if (confirm('Are you sure you want to delete?')) {
        this.TaskService.deleteTask(taskId).subscribe(() => {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            if (this.editingTask && this.editingTask.id === taskId) {
                this.cancelEdit();
            }
        });
    }
}

}
