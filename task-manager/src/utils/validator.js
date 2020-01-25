// Validate that the fields on an object are all defined on the given mongoose schema
// (or in the given list of 'allowed fields')

const validateFields = function(obj, schema, allowed) {
    if (!allowed) {
        // By default all the fields on the given model (schema) are allowed
        allowed = Object.keys(schema.paths) 
    }
    const actuals = Object.keys(obj)
    return actuals.every((actual) => allowed.includes(actual))
}

module.exports = validateFields