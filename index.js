const addRef = document.querySelector('header .action-wrapper .add');
const inputModalRef = document.querySelector('.input-modal');
const newTaskRef = document.querySelector('.input-modal');
const backLogRef = document.querySelector('.taskList .backLog-taskList');
const doingRef = document.querySelector('.taskList .doing-taskList');
const reviewRef = document.querySelector('.taskList .review-taskList');
const doneRef = document.querySelector('.taskList .done-taskList');
const backLogTaskRef = document.querySelector('.backLog-taskList');
const doingTaskRef = document.querySelector('.doing-taskList')
const reviewTaskRef = document.querySelector('.review-taskList')
const doneTaskRef = document.querySelector('.done-taskList')
const deleteIconActionRef = document.querySelector('.action-wrapper .delete')
const taskWrapRef = document.querySelector('.taskList')
const searchbarRef = document.querySelector('.search-bar input');

const tasks = JSON.parse(localStorage.getItem('taskItem')||"[]");
//whenever clicked on + button the inputModal box pops Up
addRef.addEventListener('click',(event)=>{
    toggleFunction();
})

function render(tasks){
   tasks.forEach((task) =>{
    createNewTask(task);
   })
}
render(tasks);
function toggleFunction(){
    if(inputModalRef.classList.contains('hide')){
        removeAllSelection();
        inputModalRef.classList.remove('hide')
    }else{
        inputModalRef.classList.add('hide')
    }
}

function removeAllSelection(){
    categoryRefs.forEach((categoryRef) =>{
        categoryRef.classList.remove('selected')
    })
}
const categoryRefs = document.querySelectorAll('.right-section .category');
categoryRefs.forEach((categoryRef) =>{
    categoryRef.addEventListener('click',(event)=>{
        removeAllSelection();
        event.target.classList.add('selected')
    })
})

newTaskRef.addEventListener('keydown',(event)=>{
    if(event.key == "Enter"){
        const newTitle = event.target.value;
        const selectedCategoryRef = document.querySelector('.right-section .category.selected')
        const selectedCategory = selectedCategoryRef.dataset.category;
        const newTask = {
            id:Math.floor(Math.random() * 100),
            title:newTitle,
            category:selectedCategory
        }
        tasks.push(newTask);
        localStorage.setItem('taskItem',JSON.stringify(tasks))
        createNewTask(newTask);
        toggleFunction();
        event.target.value = "";
    }   
})
function createNewTask(newTask){
    const taskRef = document.createElement('div');
    taskRef.className = 'task';
    taskRef.dataset.id = `${newTask.id}`;
    taskRef.innerHTML =
    `<div class="task-id">Task-Id - ${newTask.id}</div>
    <div class="task-title"><textarea>${newTask.title}</textarea></div>
    <div class="task-delete-icon"><i class="fa-solid fa-trash"></i></div>`
    if(newTask.category == 'backLog'){
        backLogRef.appendChild(taskRef)
    }else if(newTask.category == 'doing'){
        doingRef.appendChild(taskRef)
    }else if(newTask.category == 'review'){
        reviewRef.appendChild(taskRef)
    }
    else if(newTask.category == 'done'){
        doneRef.appendChild(taskRef)
    }
}

backLogTaskRef.addEventListener('click',(event)=>{
        if(event.target.classList.contains('fa-trash')){
            event.target.closest('.task').remove();
            deleteTaskData(event.target.closest('.task').dataset.id);
        }
})
doingTaskRef.addEventListener('click',(event)=>{
    if(event.target.classList.contains('fa-trash')){
        event.target.closest('.task').remove();
        deleteTaskData(event.target.closest('.task').dataset.id);

    }
})
reviewTaskRef.addEventListener('click',(event)=>{
    if(event.target.classList.contains('fa-trash')){
        event.target.closest('.task').remove();
        deleteTaskData(event.target.closest('.task').dataset.id);
    }
})
doneTaskRef.addEventListener('click',(event)=>{
    if(event.target.classList.contains('fa-trash')){
        event.target.closest('.task').remove();
        deleteTaskData(event.target.closest('.task').dataset.id);
    }
})

deleteIconActionRef.addEventListener('click',(event)=>{
    if(taskWrapRef.dataset.deleteenabled == 'true'){
        taskWrapRef.dataset.deleteenabled = 'false';
    }else{
        taskWrapRef.dataset.deleteenabled = 'true';
    }
})
function deleteTaskData(id){
    console.log(tasks)
    const selectedIndex = tasks.findIndex(task => Number(task.id) === Number(id))
    tasks.splice(selectedIndex,1);
    localStorage.setItem('taskItem',JSON.stringify(tasks));
}

searchbarRef.addEventListener('keyup',(event) =>{
    backLogTaskRef.innerHTML="";
    doingTaskRef.innerHTML="";
    reviewTaskRef.innerHTML="";
    doneTaskRef.innerHTML="";
    const searchElement = event.target.value;
    console.log(searchElement)
    tasks.forEach(task =>{
        if(task.title.includes(searchElement)){
            createNewTask(task);
            console.log(task)
        }
    })
})
