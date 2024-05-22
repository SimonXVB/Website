const title = document.getElementById("title");
const desc = document.getElementById("desc");
const date = document.getElementById("date");
const editDiv = document.getElementById("editDiv");
const titleEdit = document.getElementById("titleEdit");
const descEdit = document.getElementById("descEdit");
const dateEdit = document.getElementById("dateEdit");
const confirmEdit = document.getElementById("confirmEdit");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
let index = -1;
const arr = [];

    function CreateEntry(title, desc, date, index) {
        this.titleName = title;
        this.descName = desc;
        this.dateName = date;
        this.indexName = index;
    };

function stuff(){
    if(title.value === "" || desc.value === "" || date.value === ""){
       alert("Input please")
    }
    else{
            function pushToArr(){           
                const obj = new CreateEntry(title.value, desc.value, date.value.split("-").reverse().join("-"), index = index + 1);
                arr.push(obj);
                console.log(arr)
                };

            function display(){
                list.innerHTML = "";
                for(let i = 0; i < arr.length; i++){
                list.innerHTML +=   `<div id="${arr[i].indexName}" class = "container">
                                        <p class = "task">Title: ${arr[i].titleName}</p>
                                        <p class = "task">Description: ${arr[i].descName}</p>
                                        <p class = "task">To-Do-Date: ${arr[i].dateName}</p>
                                        <button onclick = "del(${arr[i].indexName})" class = "taskBtn">Delete</button>
                                    </div>`;
                };

                title.value = "";
                desc.value = "";
                date.value = "";
                };
    pushToArr();
    display();
    };
};

function del(el){
    const dataIndex = arr.findIndex(
        (item) => item === el
    );

    arr.splice(dataIndex, 1);
    index = index - 1;
    document.getElementById(`${el}`).remove();
};

function render(e){
    e.preventDefault();

    stuff();
}

addBtn.addEventListener("click", render);