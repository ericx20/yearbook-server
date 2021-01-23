const testForm = document.querySelector('form')
const testResponse = document.querySelector('input')
const lineOne = document.querySelector('#lineOne')
const lineTwo = document.querySelector('#lineTwo')

// work in progress, don't use just yet
// send requests with Postman first, then once the API is done
// then work on this (refactored recently, may be broken)

// e stands for event
testForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent default refreshing page
    const canvas = testResponse.value
    console.log(canvas);

    // now fetch
    fetch('/test?canvas=' + canvas).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                lineOne.textContent = data.error
                lineTwo.textContent = ''
            } else {
                lineOne.textContent = 'id: ' + data._id
                lineTwo.textContent = 'canvas: ' + data.canvas
            }
        })
    })
})