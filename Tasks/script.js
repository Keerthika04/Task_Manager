const taskcontainer = document.querySelector(".task_container");
let globalstore = [];
console.log(taskcontainer);

const generatehtmlcard = (taskdata) => `
<div class="col-6 col-lg-4 mt-3">
    <div class="card">
        <h5 class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-danger" id=${taskdata.id} onclick="deletecard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskdata.id} onclick="deletecard.apply(this,arguments)"></i></button>
        </h5>
        <div class="card-body">
            <div>
                <img src="${taskdata.ImageURL}" class="card-img-top" alt="...">
            </div>
            <h5 class="card-title mt-3">${taskdata.TaskTitle}</h5>
            <p class="card-text">${taskdata.TaskDescription}</p>
        </div>
    </div>
</div>`
;


const loadinitialcarddata = () => {
 const getcarddata = localStorage.getItem("TaskY");
 const {cards} = JSON.parse(getcarddata);
 cards.map((cardobject) => {
     taskcontainer.insertAdjacentHTML("beforeend",generatehtmlcard(cardobject));
     globalstore.push(cardobject);
 }
 )
};

const saveChanges = () => {
    const taskdata = {
        id:`${Date.now()}`,
        ImageURL: document.getElementById("img-url").value,
        TaskTitle:document.getElementById("task-title").value,
        TaskType:document.getElementById("task-title").value,
        TaskDescription:document.getElementById("task-description").value
    };

    taskcontainer.insertAdjacentHTML("beforeend",generatehtmlcard(taskdata));
    globalstore.push(taskdata);
    localStorage.setItem("TaskY",JSON.stringify({cards:globalstore}));

    clearInput();
};

const clearInput = () => {

    document.getElementById('img-url').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';

};

const deletecard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    let tagname = event.target.tagName;

    globalstore = globalstore.filter((cardobject) => cardobject.id !== targetID);
    localStorage.setItem ("TaskY",JSON.stringify({cards: globalstore}));

    if(tagname === "BUTTON") {
        return taskcontainer.removeChild(event.target.parentNode.parentNode.parentNode);
    } else{
        return taskcontainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
        

};

    