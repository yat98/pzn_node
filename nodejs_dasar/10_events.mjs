import {EventEmitter} from 'events';

const emitter = new EventEmitter();

emitter.addListener('hello', (name) => {
  console.info(`Hello ${name}`);
});
emitter.addListener('hello', (name) => {
  console.info(`Hola ${name}`);
});

emitter.emit('hello','Hidayat');