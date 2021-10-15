function getTodos() {
    return new Promise((resolve, reject) => {
      let todos = JSON.parse(localStorage.getItem('todos') || '[]')
      resolve(todos)
    })
  }
  
  function saveTodo(text) {
    return new Promise((resolve, reject) => {
      let todos = JSON.parse(localStorage.getItem('todos') || '[]')
      let id = todos.length + 1
      let todo = {id, text}
      todos.push(todo)
      localStorage.setItem('todos', JSON.stringify(todos))
      resolve(todos)
    })  
  }
  
  function updateTodo(id, newText) {
    return new Promise((resolve, reject) => {
      let todos = JSON.parse(localStorage.getItem('todos') || '[]')
      let todo = todos.find(todo => todo.id === id)
      todo.text = newText
      localStorage.setItem('todos', JSON.stringify(todos))
      resolve(todos)
    })   
  }
  
  function deleteTodo(id) {
    return new Promise((resolve, reject) => {
      let todos = JSON.parse(localStorage.getItem('todos') || '[]')
      todos = todos.filter(todo => todo.id != id)
      localStorage.setItem('todos', JSON.stringify(todos))
      resolve(todos)
    })   
  }
  
  const $ = s => document.querySelector(s)
  
  const template = `
    <li data-id={{id}}>
      <div class="item">
        <span class="text">{{text}}</span>
        <i class="del" >删除</i>
        <i class="edit" >编辑</i>
      </div>
      <div class="edit-area">
        <input type="text" value="{{text}}"> <i class="save">保存</i>
      </div>
    </li>
  `
  
  function render(todos) {
    $('main > ul').innerHTML =  todos.map(todo => template.replace(/{{text}}/g, todo.text).replace(/{{id}}/, todo.id)
    ).join('')
  }
  
  
  getTodos()
    .then(todos => render(todos))
  
  $('.add').onclick = function() {
    let todoText = $('footer input').value
    if( todoText !== '') {
      saveTodo(todoText)
        .then(todos => render(todos))
    }
  }
  
  $('main ul').onclick = function(e) {
    let parent = e.target.parentNode.parentNode
    let id = +parent.getAttribute('data-id')
    if(e.target.classList.contains('del')) {
      deleteTodo(id)
        .then(todos => render(todos))
    }
    
    if(e.target.classList.contains('edit')) {
      parent.classList.add('edit')
    }
    
    if(e.target.classList.contains('save')) {
      updateTodo(id, e.target.previousElementSibling.value)
        .then(todos => {
          render(todos)
          e.target.parentNode.parentNode.classList.remove('edit')
      })
    } 
    
  }
  
  
  
  
  
  