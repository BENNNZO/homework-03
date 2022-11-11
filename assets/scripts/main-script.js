let complexityOptions = {
    length: 10,
    upperCase: true,
    lowerCase: true,
    special: true,
    numbers: true
}

let rotation = 0
let copied = false

let letterArray  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let specialArray = ['!', "@", '#', '$', '%', "^", '&', '*', '(', ")", '~', '`', '-', "=", '[', ']', '\\', ';', "'", ',', '.', '/', '_', "+", '{', '}', '|', ':', "\"", '<', '>', '?']
let numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const lengthDisplay = document.getElementById('length-display')

document.querySelectorAll('button').forEach((e, i) => {
    setTimeout(function() {
        e.classList.remove('fade-in')
    }, ((150 * i) + 1700))
})

document.documentElement.style.setProperty('--headingCharacterWidth', `${document.getElementById('title').clientWidth}px`) // property setup for typing animation
document.getElementById('title').style.width = '0'

setInterval(function() { // updates the generator when settings are changed (updates happen every 50ms)
    complexityOptions.length = document.getElementById('password-length-slider').value;

    if (lengthDisplay.textContent.charAt(0) === '0') { // Remove 0 of textContent if present
        lengthDisplay.textContent = lengthDisplay.textContent.slice(1)
    }

    if (complexityOptions.length != lengthDisplay.textContent) { // if length changes then update generated password
        generatePassword(complexityOptions)
    }

    if (complexityOptions.length < 10) { // if length is less than 10 then add 0 to the front (so that the character anount stays consistant)
        lengthDisplay.textContent = `0${complexityOptions.length}`
    } else {
        lengthDisplay.textContent = complexityOptions.length
    }
}, 50)

function generateButtonClick() {
    rotation += 360
    document.documentElement.style.setProperty('--generate-icon-rotation', `${rotation}deg`)
}

function complexityChange(option) {
    const optionContainer = document.getElementById(`${option}-complexity-option-container`)

    if (option === 'lowercase') {
        complexityOptions.lowerCase = !complexityOptions.lowerCase
        generatePassword(complexityOptions)
        const iconSVG = document.getElementById('letterSVG')
        if (complexityOptions.lowerCase) {
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
        complexityOptions.upperCase = !complexityOptions.upperCase
        generatePassword(complexityOptions)
        const iconSVG = document.getElementById('capitalSVG')
        if (complexityOptions.upperCase) {
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
        complexityOptions.special = !complexityOptions.special
        generatePassword(complexityOptions)
        const iconSVG = document.getElementById('specialSVG')
        if (complexityOptions.special) {
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
        complexityOptions.numbers =! complexityOptions.numbers
        generatePassword(complexityOptions)
        const iconSVG = document.getElementById('numberSVG')
        if (complexityOptions.numbers) {
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

function generatePassword(complexityOptions) {
    document.getElementById('copy-button').classList.remove('copied')
    let password = []

    for (let i = 0; i < complexityOptions.length; i++) {
        let randCharacter = []

        if (complexityOptions.lowerCase) {  // if letters are enabled check is capital is also and grab a random letter according to parameters
            if (complexityOptions.upperCase) {
                const randLetter = letterArray[Math.floor(Math.random() * letterArray.length)]
                randCharacter.push(randLetter)
            } else {
                const randLetter = letterArray[Math.floor(Math.random() * letterArray.length)]
                randCharacter.push(randLetter.toLowerCase())
            } 
        } else if (complexityOptions.upperCase) {
            const randLetter  = letterArray[Math.floor(Math.random() * letterArray.length)]
            randCharacter.push(randLetter.toUpperCase())
        }
        if (complexityOptions.special) {  // if special characters are enabled then get a random character from array
            const randSpecial = specialArray[Math.floor(Math.random() * specialArray.length)]
            randCharacter.push(randSpecial)
        }
        if (complexityOptions.numbers) {  // if number characters are enabled then get a random character from array
            const randNumber  = numbersArray[Math.floor(Math.random() * numbersArray.length)]
            randCharacter.push(randNumber)
        }

        password.push(randCharacter[Math.floor(Math.random() * randCharacter.length)])
    }

    if (!complexityOptions.lowerCase && !complexityOptions.upperCase && !complexityOptions.special && !complexityOptions.numbers) { // if nothing is enabled then it lets the user know
        document.getElementById('password-output').textContent = "ERROR: No Complexity Option Selected"
    } else { // else output the newly generated password
        document.getElementById('password-output').textContent = password.join('')
    }
}

function copyClipboard() {
    navigator.clipboard.writeText(document.getElementById('password-output').innerHTML)
    document.getElementById('copy-button').classList.add('copied')
}

// setTimeout(function () {
//     const fadeInElements = document.querySelectorAll('.fade-in')
//     for (let i = 0; i < fadeInElements.length; i++) {
//         fadeInElements[i].classList.remove('fade-in')
//     }
// }, 1500)

generatePassword(complexityOptions)