import eventEmitter from 'events'

class Emitter extends eventEmitter {}

const eventoRealizado = new Emitter()

export default eventoRealizado
