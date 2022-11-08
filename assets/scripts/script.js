let length = 10
let letters = true
let capital = true
let special = true
let numbers = true

let rotation = 0
let copied = false

let letterArray  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let specialArray = ['!', "@", '#', '$', '%', "^", '&', '*', '(', ")", '~', '`', '-', "=", '[', ']', '\\', ';', "'", ',', '.', '/', '_', "+", '{', '}', '|', ':', "\"", '<', '>', '?']
let numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const lengthDisplay = document.getElementById('length-display')

document.documentElement.style.setProperty('--headingCharacterWidth', `${document.getElementById('title').clientWidth}px`) // property setup for typing animation
document.getElementById('title').style.width = '0'

setInterval(function() { // updates the generator when settings are changed (updates happen every 50ms)
    length = document.getElementById('password-length-slider').value;

    if (lengthDisplay.textContent.charAt(0) === '0') { // Remove 0 of textContent if present
        lengthDisplay.textContent = lengthDisplay.textContent.slice(1)
    }

    if (length != lengthDisplay.textContent) { // if length changes then update generated password
        generatePassword(length, letters, capital, special, numbers)
    }

    if (length < 10) { // if length is less than 10 then add 0 to the front (so that the character anount stays consistant)
        lengthDisplay.textContent = `0${length}`
    } else {
        lengthDisplay.textContent = length
    }
}, 50)

function generateButtonClick() {
    rotation += 360
    document.documentElement.style.setProperty('--generate-icon-rotation', `${rotation}deg`)
}

function complexityChange(option) {
    const optionContainer = document.getElementById(`${option}-complexity-option-container`)

    if (option === 'letter') {
        letters =! letters
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('letterSVG')
        if (letters) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
            optionContainer.style.backgroundColor = 'rgb(104, 210, 104)'
            optionContainer.style.boxShadow = '0 0 20px rgb(104, 210, 104, 0.7)'
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
            optionContainer.style.backgroundColor = 'lightcoral'
            optionContainer.style.boxShadow = '0 0 20px lightcoral'
        }
    }
    if (option === 'capital') {
        capital =! capital
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('capitalSVG')
        if (capital) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
            optionContainer.style.backgroundColor = 'rgb(104, 210, 104)'
            optionContainer.style.boxShadow = '0 0 20px rgb(104, 210, 104, 0.7)'
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
            optionContainer.style.backgroundColor = 'lightcoral'
            optionContainer.style.boxShadow = '0 0 20px lightcoral'
        }
    }
    if (option === 'special') {
        special =! special
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('specialSVG')
        if (special) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
            optionContainer.style.backgroundColor = 'rgb(104, 210, 104)'
            optionContainer.style.boxShadow = '0 0 20px rgb(104, 210, 104, 0.7)'
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
            optionContainer.style.backgroundColor = 'lightcoral'
            optionContainer.style.boxShadow = '0 0 20px lightcoral'
        }
    }
    if (option === 'number') {
        numbers =! numbers
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('numberSVG')
        if (numbers) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
            optionContainer.style.backgroundColor = 'rgb(104, 210, 104)'
            optionContainer.style.boxShadow = '0 0 20px rgb(104, 210, 104, 0.7)'
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
            optionContainer.style.backgroundColor = 'lightcoral'
            optionContainer.style.boxShadow = '0 0 20px lightcoral'
        }
    }
}

function generatePassword(length, letters, capital, special, numbers) {
    document.getElementById('copy-button').classList.remove('copied')
    let password = []

    for (let i = 0; i < length; i++) {
        let randCharacter = []

        if (letters) {  // if letters are enabled check is capital is also and grab a random letter according to parameters
            if (capital) {
                const randLetter  = letterArray[Math.floor(Math.random() * letterArray.length)]
                randCharacter.push(randLetter)
            } else {
                const randLetter  = letterArray[Math.floor(Math.random() * letterArray.length)]
                randCharacter.push(randLetter.toLowerCase())
            }
        } else if (capital === true) {
            const randLetter  = letterArray[Math.floor(Math.random() * letterArray.length)]
            randCharacter.push(randLetter.toUpperCase())
        }
        if (special) {  // if special characters are enabled then get a random character from array
            const randSpecial = specialArray[Math.floor(Math.random() * specialArray.length)]
            randCharacter.push(randSpecial)
        }
        if (numbers) {  // if number characters are enabled then get a random character from array
            const randNumber  = numbersArray[Math.floor(Math.random() * numbersArray.length)]
            randCharacter.push(randNumber)
        }

        password.push(randCharacter[Math.floor(Math.random() * randCharacter.length)])
    }

    if (!letters && !capital && !special && !numbers) { // if nothing is enabled then it lets the user know
        password = "ERROR: No Complexity Option Selected"
    }

    if (Array.isArray(password)) { // if password is string then it doesnt try to join the array together
        document.getElementById('password-output').textContent = password.join('')
    } else {
        document.getElementById('password-output').textContent = password
    }
}

function copyClipboard() {
    navigator.clipboard.writeText(document.getElementById('password-output').innerHTML)
    document.getElementById('copy-button').classList.add('copied')
}

generatePassword(length, letters, capital, special, numbers)