
class AnotherClass
    constructor: (@name, @surname) ->
        console.log 'another class initialized'

module.exports = AnotherClass

module.register_protocol_impl =
    IDraggable: -> console.log 'jklj'

module.register_protocol = 
    IDraggable: [
        ['setX', ['x']]
        ['setY', ['y']]
        ['setXY', ['x', 'y']]
        ['onDragStart', ['f']]
        ['onDragStop', ['f']]
    ]

    IMovable: [
        ['setX', ['x']]
        ['setY', ['y']]
        ['setXY', ['x', 'y']]
        ['onDragStart', ['f']]
        ['onDragStop', ['f']]
    ]

