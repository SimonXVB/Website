const inputDiv = document.getElementById("input-div");
const todoDiv = document.getElementById("todo-Div");
const projectDiv = document.getElementById("project-Div");
const todoBtn = document.getElementById("todoBtn");
const projectBtn = document.getElementById("projectBtn");

//Todo
const todoArr = [];

function openTodoInput() {
    inputDiv.innerHTML =    `<p id = "inputHeader">Add Todo</p>
                                <label for = "titleInp">Title:</label>
                                <input id = "titleInp"></input>

                                <label for = "descInp">Description:</label>
                                <input id = "descInp"></input>

                                <label for = "dateInp">Due Date:</label>
                                <input type = date id = "dateInp"></input>

                                <label for = "priorityInp">Priority</label>
                                <select name = "priorityInp" id = "priorityInp">
                                    <option>No Priority</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                                <button id = "addTodoBtn">Add Todo</button>`
};

class getValuesFromInput {
    constructor(title, description, date, priority, index){
        this.title = title,
        this.description = description,
        this.date = date,
        this.priority = priority
        this.index = index
    };
};

function addToArr(){
    const addTodoBtn = document.getElementById("addTodoBtn");

    addTodoBtn.addEventListener("click", () => {
        const todo = new getValuesFromInput(titleInp.value, descInp.value, dateInp.value, priorityInp.value, Date.now());
        todoArr.push(todo);
        console.log(todoArr);
    })
};

function addToDOM(){
    const addTodoBtn = document.getElementById("addTodoBtn");

    addTodoBtn.addEventListener("click", () => {
        todoDiv.innerHTML = "";
        todoArr.forEach(({title, description, date, priority, index}) => {
            todoDiv.innerHTML +=    `<div id="${index}" class = "todoDOMDiv">
                                        <p>Title: ${title}</p>
                                        <p>Description: ${description}</p>
                                        <p>Due-Date: ${date}</p>
                                        <p>Priority: ${priority}</p>
                                        <button onclick = "deleteTask(${index})" class = "delTsk">Delete Todo</button>
                                        <button onclick = "editTask(${index})">Edit Todo</button>
                                    </div>`
        });
        inputDiv.innerHTML = "";
    });
};

const deleteTask = (buttonEl) => {
    for(let i = 0; i < todoArr.length; i++){
        if(todoArr[i].index === buttonEl){

            document.getElementById(todoArr[i].index).remove();
            todoArr.splice(i, 1);
        }
    }
};

const edit = (buttonEl) => {
    for(let i = 0; i < todoArr.length; i++){
        if(todoArr[i].index === buttonEl){
            titleInp.value = todoArr[i].title;
            descInp.value = todoArr[i].description;
            dateInp.value = todoArr[i].date;
            priorityInp.value = todoArr[i].priority;
            deleteTask(buttonEl);
            
        };
    };
};

const editTask = (buttonEl) => {
    todoBtn.disabled = true;
    projectBtn.disabled = true;
    todoDiv.style.display = "none";

    openTodoInput();
    edit(buttonEl);

    inputHeader.innerText = "Edit Todo";
    addTodoBtn.innerText = "Confirm Edit";

    addTodoBtn.addEventListener("click", () => {
        todoDiv.style.display = "block";
        todoBtn.disabled = false;
        projectBtn.disabled = false;
    });

    addToArr();
    addToDOM();
};



function addTodoToDOM(e) {
    e.preventDefault();
    
    openTodoInput();
    addToArr();
    addToDOM();
};

todoBtn.addEventListener("click", addTodoToDOM);

//Project

const projectArray = [];

function openProjectInput() {
    inputDiv.innerHTML =    `<p id = "inputHeader">Create Project</p>
                                <label for = "projectInp">Project name:</label>
                                <input id = "projectInp"></input>

                                <button id = "addProjectBtn">Create new Project</button>`
};

class newProject {
    constructor(title, index){
        this.title = title,
        this.index = index
    };
};


function addProjectToArrAndDOM(){
    const addProjectBtn = document.getElementById("addProjectBtn");
    
    addProjectBtn.addEventListener("click", () => {
        const project = new newProject(projectInp.value, Date.now());
        const projArr = new Array();
        const todoProjArr = new Array();
        projArr.push(project);
        projArr.push(todoProjArr);
        projectArray.push(projArr);
        
        projectDiv.innerHTML += `<div id = "${project.index}" class = "projDiv">
                                    <p>${project.title}</p>
                                    <button onclick = "addToProject(${project.index})">Add Todo to ${project.title}</button>
                                    <button onclick = "deleteProj(${project.index})">Delete Project</button>
                                    <div id = "content${project.index}"></div>
                                </div>`;
        
        inputDiv.innerHTML = "";
        console.log(projectArray);
    });
};

function getProjectId(buttonEl){
    for(let i = 0; i < projectArray.length; i++){
        if(projectArray[i][0].index === buttonEl){
            return i;
        };
    };
};

function addTodoToProjectArr(buttonEl){
    const addTodoBtn = document.getElementById("addTodoBtn");

    addTodoBtn.addEventListener("click", () => {
        const todo = new getValuesFromInput(titleInp.value, descInp.value, dateInp.value, priorityInp.value, Date.now());
        projectArray[getProjectId(buttonEl)][1].push(todo);
        console.log(projectArray[getProjectId(buttonEl)][1]);
    });
};

function addToProject(buttonEl){
    const projectIndex = getProjectId(buttonEl);
    const currentProjectDiv = document.getElementById(`content${projectArray[projectIndex][0].index}`);
    
    openTodoInput();
    const addTodoBtn = document.getElementById("addTodoBtn");
    addTodoToProjectArr(buttonEl);

    addTodoBtn.addEventListener("click", () => {
        currentProjectDiv.innerHTML = "";

        projectArray[projectIndex][1].forEach(({title, description, date, priority, index}) => {
            currentProjectDiv.innerHTML +=  `<div id = "${index}" class = "projTodoDiv">
                                                <p>Title: ${title}</p>
                                                <p>Description: ${description}</p>
                                                <p>Due-Date: ${date}</p>
                                                <p>Priority: ${priority}</p>
                                                <button onclick = "deleteProjectTask(${index})">Delete Todo</button>
                                                <button onclick = "editProjectTask(${index})">Edit Todo</button>
                                            </div>`
        });
        inputDiv.innerHTML = "";
        console.log(projectArray)
    });
};

function deleteProjectTask(buttonEl){
    for(let i = 0; i < projectArray.length; i++){
        for(let j = 0; j < projectArray[i][1].length; j++){
            if(projectArray[i][1][j].index === buttonEl){
                document.getElementById(projectArray[i][1][j].index).remove();
                projectArray[i][1].splice(j, 1);
            };
        };
    };
};

function editProjectTask(buttonEl){
    todoBtn.disabled = true;
    projectBtn.disabled = true;
    todoDiv.style.display = "none";
    projectDiv.style.display = "none";


    for(let i = 0; i < projectArray.length; i++){
        for(let j = 0; j < projectArray[i][1].length; j++){
            if(projectArray[i][1][j].index === buttonEl){
                openTodoInput();

                titleInp.value = projectArray[i][1][j].title;
                descInp.value = projectArray[i][1][j].description;
                dateInp.value = projectArray[i][1][j].date;
                priorityInp.value = projectArray[i][1][j].priority;

                const addTodoBtn = document.getElementById("addTodoBtn");
        
                addTodoBtn.addEventListener("click", () => {
                    const todo = new getValuesFromInput(titleInp.value, descInp.value, dateInp.value, priorityInp.value, Date.now());
                    projectArray[i][1].push(todo);

                    inputDiv.innerHTML = "";
                    todoDiv.style.display = "block";
                    todoBtn.disabled = false;
                    projectBtn.disabled = false;
                    projectDiv.style.display = "block";
                    deleteProjectTask(buttonEl);

                    const currentDiv = document.getElementById(`content${projectArray[i][0].index}`);
                    currentDiv.innerHTML = "";

                    projectArray[i][1].forEach(({title, description, date, priority, index}) => {
                        currentDiv.innerHTML +=  `<div id = "${index}" class = "projTodoDiv">
                                                            <p>Title: ${title}</p>
                                                            <p>Description: ${description}</p>
                                                            <p>Due-Date: ${date}</p>
                                                            <p>Priority: ${priority}</p>
                                                            <button onclick = "deleteProjectTask(${index})">Delete Todo</button>
                                                            <button onclick = "editProjectTask(${index})">Edit Todo</button>
                                                        </div>`
                    });
                    console.log(currentDiv)
                });
            };
        };
    };
};

function deleteProj(buttonEl){
    const projectIndex = getProjectId(buttonEl);
    const currentProjectDiv = document.getElementById(projectArray[projectIndex][0].index);

    currentProjectDiv.remove();
    projectArray.splice(projectIndex, 1);
};

function addProjectToDOM(){

    openProjectInput();
    addProjectToArrAndDOM();
};

projectBtn.addEventListener("click", addProjectToDOM);