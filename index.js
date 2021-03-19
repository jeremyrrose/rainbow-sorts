const message = `\x1b[38;5;224m
Choose a sort to display, along with optional command line arguments:

Syntax: npm run SORT [ TIMEOUT [ OPTIONS ] ]
\x1b[38;5;50m
Sorts: bubble insertion merge quick
Timeout: First argument after sort (default : 400)
Options: 
wave notes (both boolean; each true if included)
words nums letters (sets input array, default : letters)
\x1b[38;5;45m
Examples:
npm run quick
npm run merge 50 wave words

View README.md or visit https://github.com/jeremyrrose/rainbow-sorts for more details.

`

process.stdout.write(message)