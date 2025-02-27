import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressBarModule,
    MatRippleModule
  ],
  animations: [
    trigger('todoAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0 }))
      ])
    ])
  ],
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .app-header {
      text-align: center;
      margin-bottom: 2rem;
      color: white;
    }

    .app-title {
      font-size: 2.5rem;
      font-weight: 300;
      margin: 0;
      padding: 1rem 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .container {
      max-width: 800px !important;
      width: 100%;
      margin: 0 auto;
      padding: 0 1rem;
    }

    mat-card {
      border-radius: 16px !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95) !important;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .todo-card {
      margin-bottom: 12px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
    }

    .todo-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    }

    .main-card {
      padding: 24px;
      background: white;
    }

    mat-form-field {
      width: 100%;
      margin-top: 8px;
    }

    .add-todo-button {
      height: 56px;
      min-width: 120px;
      background: linear-gradient(45deg, #667eea, #764ba2) !important;
      color: white !important;
      font-weight: 500;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .add-todo-button:hover {
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
      transform: translateY(-1px);
    }

    .todo-text {
      font-size: 1.1rem;
      color: #333;
      flex-grow: 1;
      margin: 0 16px;
      font-weight: 400;
    }

    .completed-text {
      color: #a0aec0;
      text-decoration: line-through;
      font-style: italic;
    }

    .action-buttons {
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .todo-card:hover .action-buttons {
      opacity: 1;
    }

    .progress-section {
      margin: 20px 0;
      text-align: center;
    }

    .progress-label {
      color: #666;
      margin-bottom: 12px;
      font-weight: 500;
    }

    ::ng-deep .mat-mdc-progress-bar {
      height: 8px !important;
      border-radius: 4px;
      background: rgba(102, 126, 234, 0.1);
    }

    ::ng-deep .mat-mdc-progress-bar-fill::after {
      background: linear-gradient(45deg, #667eea, #764ba2) !important;
    }

    ::ng-deep .mat-mdc-tab-header {
      margin-bottom: 20px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      padding: 4px;
    }

    ::ng-deep .mat-mdc-tab {
      transition: all 0.3s;
      border-radius: 6px;
      margin: 0 2px;
    }

    ::ng-deep .mat-mdc-tab:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #a0aec0;
      background: rgba(102, 126, 234, 0.05);
      border-radius: 12px;
      margin-top: 20px;
    }

    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      color: #667eea;
      opacity: 0.7;
    }

    ::ng-deep .mat-mdc-form-field-infix {
      min-height: 56px !important;
      padding-top: 16px !important;
    }

    ::ng-deep .mat-mdc-form-field-wrapper {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  `],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="app-header">
        <h1 class="app-title">My Tasks</h1>
        <p class="text-white/80 text-sm mt-2">
          A demonstration of CRUD operations using the 
          <a href="https://dummyjson.com" 
             target="_blank" 
             class="text-white font-medium hover:text-white underline decoration-white/50 hover:decoration-white transition-all">
            DummyJSON
          </a> 
          Todos API. Built with Angular Material for a modern, responsive interface.
        </p>
      </div>

      <mat-card class="main-card">
        <div class="progress-section" *ngIf="todos.length > 0">
          <div class="progress-label">
            {{ completedTodos.length }} of {{ todos.length }} tasks completed
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="(completedTodos.length / todos.length) * 100"
            color="primary">
          </mat-progress-bar>
        </div>

        <mat-tab-group [selectedIndex]="selectedTab" 
                      (selectedIndexChange)="selectedTab = $event"
                      animationDuration="200ms">
          
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">list</mat-icon>
              Active ({{activeTodos.length}})
            </ng-template>

            <div class="py-4">
              <div class="flex gap-2 mb-4">
                <mat-form-field appearance="outline">
                  <mat-label>Add new task</mat-label>
                  <input matInput 
                         [(ngModel)]="newTodoText" 
                         placeholder="What needs to be done?"
                         (keyup.enter)="addTodo()">
                  <mat-icon matSuffix>assignment</mat-icon>
                </mat-form-field>
                <button mat-raised-button 
                        color="primary" 
                        (click)="addTodo()"
                        class="add-todo-button">
                  <mat-icon>add</mat-icon>
                  Add
                </button>
              </div>

              <div class="todo-list" style="margin-top: 1rem;">
                <mat-card *ngFor="let todo of activeTodos" 
                         class="todo-card"
                         matRipple
                         [@todoAnimation]>
                  <div class="flex items-center p-3">
                    <mat-checkbox
                      [checked]="todo.completed"
                      (change)="toggleTodo(todo)"
                      color="primary">
                    </mat-checkbox>
                    
                    <mat-form-field *ngIf="editingTodoId === todo.id" class="mx-4">
                      <input matInput 
                             [(ngModel)]="editingText"
                             (keyup.enter)="saveEdit(todo)"
                             (keyup.escape)="cancelEdit()"
                             #editInput>
                    </mat-form-field>

                    <span *ngIf="editingTodoId !== todo.id" 
                          class="todo-text"
                          [class.completed-text]="todo.completed">
                      {{todo.todo}}
                    </span>

                    <div class="action-buttons">
                      <button mat-icon-button 
                              color="primary"
                              (click)="editingTodoId === todo.id ? saveEdit(todo) : startEdit(todo)">
                        <mat-icon>{{editingTodoId === todo.id ? 'check' : 'edit'}}</mat-icon>
                      </button>

                      <button mat-icon-button 
                              *ngIf="editingTodoId === todo.id"
                              (click)="cancelEdit()">
                        <mat-icon>close</mat-icon>
                      </button>

                      <button mat-icon-button 
                              color="warn" 
                              (click)="deleteTodo(todo)">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                </mat-card>
                
                <div *ngIf="activeTodos.length === 0" class="empty-state">
                  <mat-icon>task</mat-icon>
                  <p>No active tasks. Time to add some!</p>
                </div>
              </div>
            </div>
          </mat-tab>

          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">check_circle</mat-icon>
              Completed ({{completedTodos.length}})
            </ng-template>

            <div class="py-4">
              <div class="todo-list">
                <mat-card *ngFor="let todo of completedTodos" 
                         class="todo-card"
                         matRipple
                         [@todoAnimation]>
                  <div class="flex items-center p-3">
                    <mat-checkbox
                      [checked]="todo.completed"
                      (change)="toggleTodo(todo)"
                      color="primary">
                    </mat-checkbox>

                    <span class="todo-text completed-text">
                      {{todo.todo}}
                    </span>

                    <div class="action-buttons">
                      <button mat-icon-button 
                              color="warn" 
                              (click)="deleteTodo(todo)">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                </mat-card>

                <div *ngIf="completedTodos.length === 0" class="empty-state">
                  <mat-icon>done_all</mat-icon>
                  <p>No completed tasks yet. Keep working!</p>
                </div>
              </div>
            </div>
          </mat-tab>

          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">delete</mat-icon>
              Deleted ({{deletedTodos.length}})
            </ng-template>

            <div class="py-4">
              <div class="todo-list">
                <mat-card *ngFor="let todo of deletedTodos" 
                         class="todo-card"
                         matRipple
                         [@todoAnimation]>
                  <div class="flex items-center p-3">
                    <span class="todo-text completed-text">
                      {{todo.todo}}
                    </span>
                    <div class="action-buttons">
                      <button mat-icon-button 
                              color="primary" 
                              (click)="restoreTodo(todo)"
                              matTooltip="Restore">
                        <mat-icon>restore</mat-icon>
                      </button>
                      <button mat-icon-button 
                              color="warn" 
                              (click)="permanentlyDeleteTodo(todo)"
                              matTooltip="Delete permanently">
                        <mat-icon>delete_forever</mat-icon>
                      </button>
                    </div>
                  </div>
                </mat-card>

                <div *ngIf="deletedTodos.length === 0" class="empty-state">
                  <mat-icon>delete_outline</mat-icon>
                  <p>No deleted tasks</p>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>

        <div *ngIf="loading" class="flex justify-center my-4">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      </mat-card>
    </div>
  `
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  deletedTodos: Todo[] = [];
  newTodoText = '';
  loading = false;
  editingTodoId: number | null = null;
  editingText = '';
  selectedTab = 0;

  get activeTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }

  get completedTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed);
  }

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.todos = response.todos;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Failed to load todos');
        this.loading = false;
      }
    });
  }

  addTodo() {
    if (!this.newTodoText.trim()) return;

    const newTodo: Partial<Todo> = {
      todo: this.newTodoText,
      completed: false,
      userId: 1 // Using a default userId
    };

    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.newTodoText = '';
        this.showSuccess('Todo added successfully');
      },
      error: () => this.showError('Failed to add todo')
    });
  }

  toggleTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id!, { completed: !todo.completed }).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: () => this.showError('Failed to update todo')
    });
  }

  deleteTodo(todo: Todo) {
    // Optimistically remove the todo from the list and add to deleted
    const todoIndex = this.todos.findIndex(t => t.id === todo.id);
    if (todoIndex !== -1) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.deletedTodos.unshift(todo);
      this.showSuccess('Todo moved to trash');
    }

    // Then try to delete from the API
    this.todoService.deleteTodo(todo.id!).subscribe({
      error: () => {
        // If API fails, revert the changes
        if (todoIndex !== -1) {
          this.todos.splice(todoIndex, 0, todo);
          this.deletedTodos = this.deletedTodos.filter(t => t.id !== todo.id);
          this.showError('Failed to delete todo, changes reverted');
        }
      }
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { 
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  startEdit(todo: Todo) {
    this.editingTodoId = todo.id!;
    this.editingText = todo.todo;
  }

  cancelEdit() {
    this.editingTodoId = null;
    this.editingText = '';
  }

  saveEdit(todo: Todo) {
    if (!this.editingText.trim() || this.editingText === todo.todo) {
      this.cancelEdit();
      return;
    }

    this.todoService.updateTodo(todo.id!, { todo: this.editingText }).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = { ...this.todos[index], todo: this.editingText };
        }
        this.cancelEdit();
        this.showSuccess('Todo updated successfully');
      },
      error: () => {
        this.showError('Failed to update todo');
        this.cancelEdit();
      }
    });
  }

  restoreTodo(todo: Todo) {
    // In a real app, you'd have an API endpoint for this
    // Here we'll simulate it using the add endpoint
    this.todoService.addTodo(todo).subscribe({
      next: (restoredTodo) => {
        this.todos.unshift(restoredTodo);
        this.deletedTodos = this.deletedTodos.filter(t => t.id !== todo.id);
        this.showSuccess('Todo restored successfully');
      },
      error: () => this.showError('Failed to restore todo')
    });
  }

  permanentlyDeleteTodo(todo: Todo) {
    // In a real app, you might want to have a separate endpoint for permanent deletion
    this.deletedTodos = this.deletedTodos.filter(t => t.id !== todo.id);
    this.showSuccess('Todo permanently deleted');
  }
} 