const Regenbogler = require('regenbogler')
const {timeout, wave, inputArr, lay, noteColor} = require('../config.js')
const message =  
"\033[2J\nM E R G E  S O R T:" 

const explanation = 
`
\x1b${noteColor}
stage 1: splits ( || ) each array roughly in half
then splits recursively until arrays have length 1
at which point they are sorted by default!

stage 2: merges ( << ) two sorted arrays by comparing the first element in each
and moving the winner of the comparison into a new sorted array
until one of the arrays is empty
`

// for output
let splits = 0
let merges = 0
let comparisons = 0
// end output


const mergeSort = async (arr, bow) => {

    splits++ // for output

    if (arr.length < 2) {
        return arr
    }

    const center = Math.floor(arr.length / 2)

    const left = arr.slice(0,center)
    const right = arr.slice(center)

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...left, "||", ...right], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}; merges ${merges}`))
    } else {
        console.log(bow.string([...left, "||", ...right]))
    }
    // end output

    return await merge(await mergeSort(left, bow), await mergeSort(right, bow), bow)

}

const merge = async (left, right, bow) => {
    merges++ // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print(["<<", ...left, "||", ...right], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}; merges ${merges}`))
    } else {
        console.log(bow.string(["<<", ...left, "||", ...right]))
    }
    // end output

    const result = []

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }

        // for output
        comparisons++
        await new Promise(resolve => setTimeout(resolve, timeout))
        if (!wave) {
            console.log(bow.print([...result, "<<", ...left, "||", ...right], false, `\n\ntotal comparisons: ${comparisons}\nsplits ${splits}; merges ${merges}`))
        } else {
            console.log(bow.string([...result, "<<", ...left, "||", ...right]))
        }
        // end output
    }
    return [...result, ...left, ...right]
}

const bow = new Regenbogler(inputArr, true, message + (lay ? explanation : "") + "\n\n")
if (wave && lay) {
    console.log(bow.message)
}
mergeSort(bow.orig, bow)
    .then((res) => {
        if (wave) {
        console.log(`\n${bow.string(res)}`)
        console.log(`\ntotal comparisons: ${comparisons}\nsplits ${splits}; merges ${merges}`)
        }
    })