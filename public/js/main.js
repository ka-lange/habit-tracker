const deleteButtons = document.querySelectorAll('.deleteBtn')
const editButtons = document.querySelectorAll('.editBtn')
const addUnitButtons = document.querySelectorAll('.addUnitBtn')
const habitItems = document.querySelectorAll('.habitItem')
const completedItems = document.querySelectorAll('.completed')
const uncompletedItems = document.querySelectorAll('.not')
const refreshButton = document.getElementById('refreshBtn')
const lightdarktoggle = document.getElementById('darklighttoggle')
// lightdarktoggle.addEventListener('click', setTheme)

// var timesClicked = 0;
// var timesClicked = localStorage.getItem("timesClicked");
// window.onload=setTheme()


// function setTheme(){
//     if(timesClicked%2 !== 0){
//         lightdarktoggle.classList.remove('bi-toggle-on')
//         lightdarktoggle.classList.add('bi-toggle-off')
//         refreshButton.classList.remove('btn-outline-light')
//         refreshButton.classList.add('btn-outline-dark')
//         document.getElementById('logo').src = 'public/images/logolight.png'
//         document.querySelector('body').style.backgroundColor = 'aliceblue'
//         document.querySelector('.modal-content').style.backgroundColor = 'aliceblue'
//         document.querySelector('body').style.color = 'rgb(29, 33, 42)'
//         document.querySelectorAll('.card-habit').forEach((card)=>{
//             card.style.backgroundColor='rgb(246, 250, 255)'
//         })
//         document.querySelectorAll('.icon-color-primary').forEach((icon)=>{
//             icon.style.color='black'
//         })
//         localStorage.setItem("timesClicked", timesClicked++);
//     } else{
//         lightdarktoggle.classList.add('bi-toggle-on')
//         lightdarktoggle.classList.remove('bi-toggle-off')
//         refreshButton.classList.add('btn-outline-light')
//         refreshButton.classList.remove('btn-outline-dark')
//         document.getElementById('logo').src = 'public/images/logodark.png'
//         document.querySelector('body').style.backgroundColor = 'rgb(29, 33, 42)'
//         document.querySelector('.modal-content').style.backgroundColor = 'rgb(29, 33, 42)'
//         document.querySelector('body').style.color = 'aliceblue'
//         document.querySelectorAll('.card-habit').forEach((card)=>{
//             card.style.backgroundColor='rgb(45, 51, 66)'
//         })
//         document.querySelectorAll('.icon-color-primary').forEach((icon)=>{
//             icon.style.color='#ffffff97'
//         })
//         localStorage.setItem("timesClicked", timesClicked++);
//     }
// }


refreshButton.addEventListener('click', () => {
    refreshCompletedHabits(); 
    refreshUncompletedHabits();
})
//setInterval(uncompleteHabits, 10000);
function refreshCompletedHabits() {
    Array.from(completedItems).forEach((habit)=>{
        uncompleteHabits();
    })
}
function refreshUncompletedHabits() {
    Array.from(uncompletedItems).forEach((habit)=>{
        // console.log(habit.children[0].dataset.id)
        refreshStreak(habit);
    })
}


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
        const response = await fetch('/completeHabit', {
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
        const response = await fetch('/uncompleteHabits', {
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
async function refreshStreak(habit){
    const habitId = habit.children[0].dataset.id
    console.log(habitId)
    try{
        const response = await fetch('/refreshStreak', {
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

async function deleteHabit(){
    const habitId = this.parentNode.parentNode.dataset.id
    console.log(habitId)
    try{
        const response = await fetch('/deleteHabit', { 
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
        const response = await fetch('/editHabit', { 
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