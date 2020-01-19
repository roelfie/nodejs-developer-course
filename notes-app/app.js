// Core modules
// NPM packages
const yargs = require('yargs')
// Local modules
const notes = require('./notes.js')

// Create add command
yargs.command('add', 'Add a new note',
    {
        title: {
            alias: 't',
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            alias: 'b',
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    (argv) => {
        notes.addNote(argv.title, argv.body)
    }
)

// Create remove command
yargs.command('remove', 'Remove a note',
    {
        title: {
            alias: 't',
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    (argv) => {
        notes.removeNote(argv.title)
    }
)

// Create read command
yargs.command('read', 'Read a note', 
    {
        title: {
            alias: 't',
            describe: 'Title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    (argv) => {
        notes.readNote(argv.title)
    }
)

// Create list command
yargs.command('list', 'Show all notes', {},
    () => {
        notes.listNotes()
    }
)

yargs.parse()
