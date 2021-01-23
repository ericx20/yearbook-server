const testForm = document.querySelector('form')
const testResponse = document.querySelector('input')
const lineOne = document.querySelector('#lineOne')
const lineTwo = document.querySelector('#lineTwo')

// e stands for event
testForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent default refreshing page
    const lineData = testResponse.value
    console.log(lineData);

    // now fetch
    fetch('/test?lineData=' + lineData).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                lineOne.textContent = data.error
                lineTwo.textContent = ''
            } else {
                lineOne.textContent = 'code: ' + data.code
                lineTwo.textContent = 'lineData: ' + data.lineData
            }
        })
    })
})