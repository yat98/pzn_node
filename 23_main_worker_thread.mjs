import {threadId, Worker} from 'worker_threads';

const worker1 = new Worker('./23_worker.mjs');
const worker2 = new Worker('./23_worker.mjs');

worker1.addListener('message', function(message){
  console.log(`Thread-${threadId} receive from worker 1 : ${message}`)
});

worker2.addListener('message', function(message){
  console.log(`Thread-${threadId} receive from worker 2 : ${message}`)
});

worker1.postMessage(10);
worker2.postMessage(10);