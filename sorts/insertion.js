const Regenbogler = require('regenbogler')
const {timeout, wave, inputArr, notes, noteColor} = require('../config.js')
const message =  
"\033[2J\nI N S E R T I O N  S O R T" 

const explanation = 
`
\x1b${noteColor}
steps through the array once, starting with index 1;
the selected element is compared with each element to its left
and each of these elements is shifted one index to the right
until the selected element encounters an element of lesser value 
and settles into place
`

const insertion = async (arr) => {

    // for output
    const bow = new Regenbogler(arr, true, message + (notes ? explanation : "") + "\n\n")
    if (wave && notes) {
        console.log(bow.message)
    }
    
    let ops = 0

    for (let i = 1; i < arr.length; i++) {
        const cur = arr[i]

        let j = i - 1
        while( arr[j] > cur && j >= 0) {

            // for output
            await new Promise(resolve => setTimeout(resolve, timeout))
            if (!wave) {
                console.log(bow.print([...arr, '?:', cur], false, `\n\ntotal steps: ${ops}\nouter ${i+1}; inner ${j+1}`, j))
            } else {
                console.log(bow.string([...arr, "?:", cur], j))
            }
            // end output

            arr[j+1] = arr[j]
            j--

            // for output
            ops++
        }
        arr[j+1] = cur

        // for output
        ops++
        await new Promise(resolve => setTimeout(resolve, timeout))
        if (!wave) {
            console.log(bow.print([...arr, '?:', cur], false, `\n\ntotal steps: ${ops}\nouter ${i+1}; inner ${j+1}`, j))
        } else {
            console.log(bow.string([...arr, "?:", cur], j))
        }
        // end output
    }
    return arr
}

insertion(inputArr)
