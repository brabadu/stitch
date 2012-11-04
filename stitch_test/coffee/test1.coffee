class SomeClass
    constructor: (@name, @methods) ->
        console.log 'some class initialized'

module.exports = new SomeClass
