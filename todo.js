// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
eventListeners();
function eventListeners(){
      form.addEventListener("submit",addTodo);

      document.addEventListener("DOMContentLoaded",loadAllTodosToUI);

      secondCardBody.addEventListener("click",deleteTodo);

      filter.addEventListener("keyup",filterTodos);

      clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
      // Arayüzden todoları temizleme
      if(confirm("Tümünü temizlemek istediğinize emin misiniz ?")){
            // YÖNTEM 1

            //todoList.innerHTML = ""; // Yavaş Çalışır.

            // YÖNTEM 2

            while(todoList.firstElementChild != null){
                  todoList.removeChild(todoList.firstElementChild);
            }
            localStorage.removeItem("todos");

      }
}

function filterTodos(e){
      console.log(e.target.value);

      const filterValue = e.target.value.toLowerCase();
      const listItems = document.querySelectorAll(".list-group-item");
      listItems.forEach(function(listitem){
                  const text = listitem.textContent.toLowerCase();
                  if(text.indexOf(filterValue) === -1){ // Bulamazsa
                        listitem.setAttribute("style","display : none !important");
                  }
                  else{
                        listitem.setAttribute("style","display : block !important");
                  }


      });

}

function deleteTodo(e){
      console.log(e.target.parentElement.parentElement);

      if(e.target.className === "fa fa-remove"){
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
            showAlert("success","Todo başarıyla silindi.");
      }
}

function deleteTodoFromStorage(deletetodo){
      let todos = getTodosFromStorage();
      todos.forEach(function(todo,index){
            if(todo === deletetodo){
                  todos.splice(index,1);    // Arrayden değeri silme
            }
      });

      localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
      let todos = getTodosFromStorage();
      todos.forEach(function(todo){
            addTodoToUI(todo);
      });
}

function addTodo(e){
      let newTodo = todoInput.value.trim();
      if(newTodo === ""){
            showAlert("danger","Lütfen bir todo giriniz.");
      }
      else{
            addTodoToUI(newTodo);
            addTodotoStorage(newTodo);
            showAlert("success","Başarıyla Eklendi.");
      }

      e.preventDefault();
}

function showAlert(type,message){
      const alert = document.createElement("div");
      alert.className = `alert alert-${type}`;
      alert.textContent = message;
      firstCardBody.appendChild(alert);
      // setTimeout
      setTimeout(function(){
            alert.remove();
      },1000);

      console.log(alert);
}

function addTodoToUI(newTodo){ // String değeri list item olarak ekleyecek.
      
      // List Item Oluşturma
      const listItem = document.createElement("li");  
      // Link oluşturma
      const link = document.createElement("a");
      link.href = "#";
      link.className = "delete-item";
      link.innerHTML = "<i class = 'fa fa-remove'></i>";

      listItem.className = "list-group-item d-flex justify-content-between";

      // Text Node Ekleme
      listItem.appendChild(document.createTextNode(newTodo));
      listItem.appendChild(link);

      // Todo List'e item ekleme
      todoList.appendChild(listItem);
      todoInput.value = "";
      console.log(listItem);
}

function getTodosFromStorage(){
      let todos;
      if(localStorage.getItem("todos") === null){
            todos=[];
      }
      else{
            todos = JSON.parse(localStorage.getItem("todos"));
      }
      return todos;
}

function addTodotoStorage(newTodo){
      let todos = getTodosFromStorage();
      todos.push(newTodo);
      localStorage.setItem("todos",JSON.stringify(todos));
}