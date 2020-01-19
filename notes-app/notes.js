const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    console.log(chalk.inverse("YOUR NOTES:"))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    })
    if (notes.length === 0) {
        console.log('No notes found.')
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(note.title + " : " + note.body)
    } else {
        console.log(chalk.red('No note found.'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // Find is like filter, but will stop as soon as a match is found.
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title, 
            body: body
        })
        saveNotes(notes)    
    } else {
        console.log(chalk.red('Note not saved. There already is a note with the same title.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesNew = notes.filter((note) => note.title !== title)
    if (notesNew.length === notes.length) {
        console.log(chalk.red('Nothing removed. No note found with title ' + title))
    } else {
        saveNotes(notesNew)
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)    
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

