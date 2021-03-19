const Regenbogler = require('regenbogler')
const {timeout, wave, inputArr, notes, noteColor} = require('../config.js')
const slow = process.argv.includes("slow")
const message =  
"\033[2J\nB U B B L E  S O R T" 

const explanation = 
`
\x1b${noteColor}
loops repeatedly through an array, 
comparing each element to the element on its right;
if the first element is higher, they are swapped in place.
this is done over and over
and over and over and over
until every element is arranged.
`

const bubbler = async arr => {

    const bow = new Regenbogler(arr, true, message + (notes ? explanation : "") + "\n\n")
    if (wave && notes) {
        console.log(bow.message)
    }

    let ops = 0

    for (let i = 0; i < arr.length - 1; i++) {

        let flip = false

        for (let j=0; j < (slow ? arr.length - 1 : arr.length - 1 - i); j++) {
            
            // for output
            await new Promise(resolve => setTimeout(resolve, timeout))
            if (!wave) { 
                console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}\npass ${i+1}; step ${j+1}`, j))
            } else {
                console.log(bow.string(arr, j))
            }
            // end output

            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                flip = true
            }

            ops++
        }

        if (!slow && !flip) {

            await new Promise(resolve => setTimeout(resolve, timeout))
            if (!wave) { 
                console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}\n`))
            } else {
                console.log(bow.string(arr))
                console.log(`\n\ntotal steps: ${ops}`)
            }

            return arr
        }
    }            
    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) { 
        console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}\n`))
    } else {
        console.log(bow.string(arr))
        console.log(`\ntotal steps: ${ops}\n`)
    }
    // end output

    return arr
}

bubbler(inputArr)
