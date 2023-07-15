import { request } from "http";

export class TodolistService{
  todoList = ['Programmer','Zaman','Now'];

  getJsonTodoList() {
    return JSON.stringify({
      code: 200,
      status: 'OK',
      data: this.todoList.map((todo, id) => {
        return { id, todo };
      })
    });
  }

  getTodoList(req,res){
    res.write(this.getJsonTodoList());
    res.end();
  }

  createTodo(req,res){
    req.addListener('data', (data) => {
      const body = JSON.parse(data.toString());
      this.todoList.push(body.todo);
      
      res.write(this.getJsonTodoList());
      res.end();
    })
  }
}