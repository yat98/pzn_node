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
}