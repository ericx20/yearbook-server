const createForm = document.getElementById('create-form')
const createCanvas = document.getElementById('create-canvas')
const createKey = document.getElementById('create-key')
const createResponse = document.getElementById('create-response')

const readForm = document.getElementById('read-form')
const readId = document.getElementById('read-id')
const readResponse = document.getElementById('read-response')

const updateForm = document.getElementById('update-form')
const updateId = document.getElementById('update-id')
const updateCanvas = document.getElementById('update-canvas')

const deleteForm = document.getElementById('delete-form')
const deleteId = document.getElementById('delete-id')
const deleteKey = document.getElementById('delete-key')


createForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default refreshing page

    // NOTE: canvas must be a string, so for real implementation you
    // must JSON.stringify() the object
    const canvas = createCanvas.value
    const key = createKey.value
    const url = '/api'
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ canvas, key })
    }
    fetch(url, request).then((response) => {
        response.json().then((data) => {
            console.log('Create page')
            if (data.errors) {
                console.log('ERROR')
            }
            console.log(data)
            createResponse.textContent = JSON.stringify(data)
        })
    })
})

readForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default refreshing page

    // NOTE: canvas must be a string, so for real implementation you
    // must JSON.stringify() the object
    const id = readId.value
    const url = '/api?_id=' + id
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, request).then((response) => {
        response.json().then((data) => {
            console.log('Read page')
            if (data.errors) {
                console.log('ERROR')
            }
            console.log(data)
            readResponse.textContent = JSON.stringify(data)
        })
    })
})


updateForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default refreshing page

    // NOTE: canvas must be a string, so for real implementation you
    // must JSON.stringify() the object
    const id = updateId.value
    const canvas = updateCanvas.value
    const url = '/api?_id=' + id
    const request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ canvas })
    }
    // response body is empty
    fetch(url, request)
})

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default refreshing page

    // NOTE: canvas must be a string, so for real implementation you
    // must JSON.stringify() the object
    const id = deleteId.value
    const key = deleteKey.value
    const url = '/api?_id=' + id
    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key })
    }
    fetch(url, request)
})

