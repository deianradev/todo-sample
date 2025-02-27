import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, HttpClientModule],
  template: `
    <app-todo-list></app-todo-list>
  `
})
export class AppComponent {}
