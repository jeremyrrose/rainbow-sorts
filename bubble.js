const Regenbogler = require('regenbogler')
const {timeout, wave, inputArr} = require('./config.js')
const slow = process.argv.includes("slow")
const message =  
"\033[2J\nB U B B L E  S O R T:" +
"\n\n\n"

const bubbler = async arr => {

    const bow = new Regenbogler(arr, true, message)

    let ops = 0

    for (let i = 0; i < arr.length - 1; i++) {

        let flip = false

        for (let j=0; j < arr.length - 1 - i; j++) {
            
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
            return arr
        }
    }            
    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) { 
        console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}`))
    } else {
        console.log(bow.string(arr))
    }
    // end output

    return arr
}

bubbler(inputArr)
