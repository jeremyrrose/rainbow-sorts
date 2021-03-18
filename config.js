const timeout = parseInt(process.argv[2]) || 400
const wave = process.argv.includes('wave')
const lay = process.argv.includes('lay')

const numsArr = [ 1, 1, 93, 6, 4, 1, 1, 1834, 2, 4, 7, 12, 1, 5, 3, 66, 12, 7, 3 ].sort(() => Math.random() - .5)
const alphaArr = "abcdefghijklmnopqrstuvwxyz".split('').sort(() => Math.random() - .5)
const sentenceArr = "the quick brown fox jumps over the lazy dog et lorem ipsum dolor sit amet".split(" ")

const inputArr = process.argv.includes("words") || process.argv.includes("nums") ? process.argv.includes("words") ? sentenceArr : numsArr : alphaArr

module.exports = {
    timeout,
    wave,
    inputArr,
    lay
}