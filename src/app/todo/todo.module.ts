import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { RouterModule , Router} from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([
      { path : 'todoList',component : TodoListComponent , pathMatch : 'full'},
      { path : 'todoList/:listId', component : TodoItemComponent, pathMatch : 'full'}
    ])
  ],
  declarations: [TodoListComponent, TodoItemComponent]
})
export class TodoModule { }
