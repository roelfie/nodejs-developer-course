// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

const URL = 'mongodb://127.0.0.1:27017'
const DB_NAME = 'task-manager'
const COLLECTION_USERS = 'users' 
const COLLECTION_TASKS = 'tasks'

const client = MongoClient(URL)

const doOnCollection = (collectionName, callback) => {
    client.connect((err, client) => {
        if (err) {
            return console.log('Error establishing connection: ' + err)
        }
        const db = client.db(DB_NAME)
        const coll = db.collection(collectionName)
        callback(coll)
    })
}

const doOnTaskCollection = (callback) => doOnCollection(COLLECTION_TASKS, callback)

const insertTasks = (tasks) => {
    doOnTaskCollection((coll) => {
        coll.insertMany(tasks, {},
            (err, result) => {
                if (err) {
                    return console.log('Error writing tasks: ' + err)
                }
                // console.log(result.ops)
            }
        )
    })    
}

const findOneTaskBy = (findBy) => {
    doOnTaskCollection((coll) => {
        coll.findOne(findBy, (err, task) => {
                if (err) {
                    return console.log('Error finding task with ' + findBy, err)
                }
                console.log(task)
            }
        )
    })
}

const findOneTaskById = (value) => findOneTaskBy({ _id: new ObjectID(value) })
const findOneTaskByDescription = (value) => findOneTaskBy({ description: value })


// STEP 1
// Cleanup database
client.connect((err, client) => {
    if (err) {
        return console.log('Error establishing connection: ' + err)
    }
    const db = client.db(DB_NAME)
    const coll = db.collection(COLLECTION_TASKS)
    coll.drop()
        .then((result) => {console.log('Collection dropped.')})
        .catch((error) => {console.log('Error occurred during drop collection: ' + error)})
})

// STEP 2
// Insert tasks (some completed, some uncompleted)
insertTasks([
    { description: 'Shopping', completed: false },
    { description: 'Paint house', completed: false },
    { description: 'Homework', completed: false },
    { description: 'Repair car', completed: true },
    { description: 'Go fishing', completed: false },
    { description: 'Buy clothes', completed: true }
])

// STEP 3
// findOneTaskById("5e29f161ac24c9493afe5f65")
// findOneTaskByDescription('Repar car')
// Find all completed tasks
client.connect((err, client) => {
    if (err) {
        return console.log('Error establishing connection: ' + err)
    }
    const db = client.db(DB_NAME)
    const coll = db.collection(COLLECTION_TASKS)
    const cursor = coll.find({ description: 'Go fishing' }, {sort: {description: 1}})
    cursor.toArray((error, documents) => {
        if (error) {
            return console.log('Error while retrieving tasks: ' + error)
        }
        console.log('Found tasks: ' + documents)
    })
})

// STEP 4
// Update stuff
client.connect()
    .then((client) => {
        const db = client.db(DB_NAME)
        const tasks = db.collection(COLLECTION_TASKS)
        const promise = tasks.updateMany(
            {description: 'Go fishing'},
            {$set: {description: 'Ga vissen!'}})

        promise.then((result) => {console.log('Update succeeded. Result: ' + result)})
               .catch((err) => {console.log('Updated failed. Error: ' + err)})
    })
    .catch((err) => {console.log('Connection failed. Error: ' + err)})

// If we run this script, in step 3 it doesn't find anything,
// and in step 4 it doesn't update anything.
// TODO I caused by callbacks & promises, but try to explain what exactly is happening.