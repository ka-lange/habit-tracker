const deleteButtons = document.querySelectorAll('.deleteBtn')
const editButtons = document.querySelectorAll('.editBtn')
const addUnitButtons = document.querySelectorAll('.addUnitBtn')
const habitCards = document.querySelectorAll('.card-habit')
const refreshButton = document.getElementById('refreshBtn')

refreshButton.addEventListener('click', uncompleteHabits)
//setInterval(uncompleteHabits, 10000);


Array.from(deleteButtons).forEach((btn)=>{
    btn.addEventListener('click', deleteHabit)
})

// var editBtnClicks = 0;
Array.from(editButtons).forEach((btn)=>{
    btn.addEventListener('click', openEditor)
})

Array.from(addUnitButtons).forEach((btn)=>{
    btn.addEventListener('click', completeHabit)
})




async function completeHabit(){
    const habitId = this.parentNode.dataset.id
    console.log(habitId)
    
    try{
        const response = await fetch('edit/completeHabit', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'habitIdFromJSFile': habitId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload() //color doesnt stay because of reload
    }catch(err){
        console.log(err)
    }
}
async function uncompleteHabits(){
    try{
        const response = await fetch('edit/uncompleteHabits', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'completed': false
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload() //color doesnt stay because of reload
    }catch(err){
        console.log(err)
    }
}

async function deleteHabit(){
    const habitId = this.parentNode.parentNode.dataset.id
    console.log(habitId)
    try{
        const response = await fetch('edit/deleteHabit', { 
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'habitIdFromJSFile': habitId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

function openEditor(){
    const habitName = this.parentNode.previousElementSibling
    const editorButtons = this.parentNode
    const habitId = this.parentNode.parentNode.dataset.id
    habitName.innerHTML = 
    `<form id="editForm" action="" method='' class="d-flex flex-column" data-id=${habitId}>
            <input type="text" id="newHabitName" name="newHabitName" class="card-title w-75">
            <div class="d-flex">
                <label for="newHabitColor">Color:</label>
                <input type="color" class="form-control w-25" id="newHabitColor" name='newHabitColor' value="#6495ED">
            </div>
        </form>`
    editorButtons.innerHTML = 
    `<div class="d-flex">
        <i id="editSubmitBtn" class="bi bi-check icon-lg mt-1" style="color: <%= el.habitColor %>"></i>
        <i id="closeEditor" class="deleteBtn bi bi-x icon-lg mt-1" style="color: <%= el.habitColor %>"></i>
    </div>`
    const editSubmitButton = document.getElementById('editSubmitBtn')
    const closeEditorButton = document.getElementById('closeEditor')
    editSubmitButton.addEventListener('click', editHabit)
    closeEditorButton.addEventListener('click', closeEditor)
}
function closeEditor(){
    location.reload()
}


async function editHabit(){
    const habitId = document.getElementById('editForm').dataset.id
    // const newName = this.parentNode.previousElementSibling.previousElementSibling.value
    console.log(habitId)
    const newHabitName = document.getElementById('newHabitName').value
    const newHabitColor = document.getElementById('newHabitColor').value
    try{
        const response = await fetch('edit/editHabit', { 
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'habitIdFromJSFile': habitId,
                'newHabitNameFromJSFile': newHabitName,
                'newHabitColorFromJSFile': newHabitColor
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}