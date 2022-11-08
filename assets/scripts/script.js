let length = 10
let letters = true
let capital = true
let special = true
let numbers = true

let letterArray  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let specialArray = ['!', "@", '#', '$', '%', "^", '&', '*', '(', ")", '~', '`', '-', "=", '[', ']', '\\', ';', "'", ',', '.', '/', '_', "+", '{', '}', '|', ':', "\"", '<', '>', '?']
let numbersArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

let specialCharacters = "!@#$%^&*()~`_+{}|:<>?-=[]\;',./'" 

const lengthDisplay = document.getElementById('length-display')

document.getElementById('password-length-slider').addEventListener('change', function() {
    generatePassword(length, letters, capital, special, numbers)
})

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

function complexityChange(option) {
    if (option === 'letter') {
        letters =! letters
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('letterSVG')
        if (letters) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
        }
    }
    if (option === 'capital') {
        capital =! capital
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('capitalSVG')
        if (capital) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
        }
    }
    if (option === 'special') {
        special =! special
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('specialSVG')
        if (special) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
        }
    }
    if (option === 'number') {
        numbers =! numbers
        generatePassword(length, letters, capital, special, numbers)
        const iconSVG = document.getElementById('numberSVG')
        if (numbers) {
            iconSVG.classList.add('on')
            iconSVG.classList.remove('off')
        } else {
            iconSVG.classList.add('off')
            iconSVG.classList.remove('on')
        }
    }
}

function generatePassword(length, letters, capital, special, numbers) {
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

    console.log(password)
    console.log(password.join(''))
    document.getElementById('password-output').textContent = password.join('')
}

generatePassword(length, letters, capital, special, numbers)