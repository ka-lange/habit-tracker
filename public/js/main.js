const deleteButtons = document.querySelectorAll('.deleteBtn')
const editButtons = document.querySelectorAll('.editBtn')
// const openEditor = document.getElementById('openEditor')


Array.from(deleteButtons).forEach((btn)=>{
    btn.addEventListener('click', deleteHabit)
})
var editBtnClicks = 0;
Array.from(editButtons).forEach((btn)=>{
    btn.addEventListener('click', openEditor)
})

function openEditor(){
    const habitName = this.parentNode.previousElementSibling
    habitName.innerHTML = '<input type="text" id="openEditor"><input type="submit">'
    console.log(habitName)
}


async function editHabit(){
    const habitId = this.parentNode.parentNode.dataset.id
    console.log(habitId)
    try{
        const response = await fetch('edit/editHabit', { 
            method: 'patch',
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