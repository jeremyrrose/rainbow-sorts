const message = `\x1b[38;2;255;198;198m
Choose a sort to display, along with optional command line arguments:

Syntax: npm run SORT [TIMEOUT [WAVE INPUT_ARRAY]]
\x1b[38;2;198;255;198m
Sorts: bubble insertion merge quick
Timeout: First argument after sort (250 by default)
Options: 
wave (true if included)
words nums letters (sets input array, letters by default)
\x1b[38;2;198;198;255m
Examples:
npm run bubble
npm run bubble 50 wave words


`

process.stdout.write(message)