const Regenbogler = require('regenbogler')
const {timeout, wave, inputArr, notes, noteColor} = require('../config.js')
const message =  
"\033[2J\nQ U I C K  S O R T"
const explanation = 
`
\x1b${noteColor}
chooses a || pivot || from each array
then arranges all elements to the left or right of the pivot
and recursively sorts the resulting left and right arrays
by the same method until all arrays have length 1
at which point they can be combined in order
`

let splits = 0
let comparisons = 0


const quick = async (arr, bow) => {

    if (arr.length < 2) {
        return arr
    }

    // for output
    splits++
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print(arr, false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string(arr))
    }
    // end output
    
    const pivot = arr.shift()
    const left = []
    const right = []

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print(["||", pivot, "||", "?:", ...arr], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string(["||", pivot, "||", "?:", ...arr]))
    }
    // end output
    
    while (arr.length) {
        comparisons++
        if (arr[0] < pivot) {
            left.push(arr.shift())
        } else {
            right.push(arr.shift())
        }

        // for output
        await new Promise(resolve => setTimeout(resolve, timeout))
        if (!wave) {
            console.log(bow.print([...left, "||", pivot, "||", ...right, "?:", ...arr], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}`))   
        } else {
            console.log(bow.string([...left, "||", pivot, "||", ...right, "?:", ...arr]))
        } 
        // end output
    }

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...left, "||", pivot, "||", ...right], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string([...left, "||", pivot, "||", ...right]))
    }
    // end output

    const result = [await quick(left, bow), await quick(right, bow)]

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...result[0],"||",pivot,"||",...result[1]], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string([...result[0],"||",pivot,"||",...result[1]]))
    }
    // end output

    return [...result[0], pivot, ...result[1]]
}

const bow = new Regenbogler(inputArr, true, message + (notes ? explanation : "") + "\n\n")
if (wave && notes) {
    console.log(bow.message)
}
quick(bow.arr, bow)
    .then((res) => {
        if (wave) {
            console.log(`\n${bow.string(res)}`)
            console.log(`\ntotal comparisons: ${comparisons}\nsplits ${splits}\n`)
        }
    })