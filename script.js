document.addEventListener('DOMContentLoaded', function(){
const todoInput=document.getElementById('todoInput');
const addTodoButton=document.getElementById('addTodoButton');
const todoList=document.getElementById('todoList');

let todos=JSON.parse(localStorage.getItem('todos')) || [] // insert pannum pothu stringify pannuvom, get pannum pothu parse pannuvom

function renderTodos(){
    todoList.innerHTML='';
    todos.forEach((todo,index)=>{
        const listItem=document.createElement('li');
        listItem.className='list-group-item d-flex justify-content-between align-items-center ';
        if(todo.completed){
            listItem.classList.add('completed')};

            listItem.textContent=todo.text; //completed true ah irunthuchi na ithu gendreate agum

            const deleteButton=document.createElement('button');
            deleteButton.className='btn btn-danger btn-sm';
            deleteButton.textContent='Delete';
            deleteButton.addEventListener('click',()=>{
                deleteTodo(index);
            })
        
        listItem.appendChild(deleteButton);
        listItem.addEventListener('click',()=>{
            toggleTodoComplete(index);
        })
        todoList.appendChild(listItem);
    })
}

function deleteTodo(index){
    todos.splice(index,1); //splice- index specification varum pothu intha function use pannanum , index ,1 ->midel of the array la irunthu remove panna  
    saveTodos();
    renderTodos();
}
 function toggleTodoComplete(index){
    todos[index].completed=!todos[index].completed; //true va nu check pannurom
    saveTodos();
    renderTodos();
 }



function addTodo(){
    const taskText=todoInput.value.trim();
    if(taskText==='') return;// taskText-nalla irunthuchi na  return pannuren ,function la yethum add agathu
    todos.push({text:taskText,completed:false}); //object ah text,completed nu two keys add pannalam
    todoInput.value='';
    saveTodos();
    renderTodos();
}
function saveTodos(){
    localStorage.setItem('todos',JSON.stringify(todos)); //store pannum pothu stringify ah pannitha antha value store pannuvom , atha yeduthu access pannum pothu parse panni object ah tha use pannuvom
}
addTodoButton.addEventListener('click',addTodo);

todoInput.addEventListener('keypress',(event)=>{
    if(event.key==='Enter'){

        addTodo();
    }
});
});