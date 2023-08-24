import timers from 'timers/promises';

// console.info(new Date());

// const name  = await timers.setTimeout(5000, 'Hidayat');

// console.info(new Date());
// console.info(name);

// for await(const startDate of timers.setInterval(1000,new Date())){
//   console.info(`Start timer at ${startDate}`);
// }

for await(const startDate of timers.setInterval(1000)){
  console.info(`Start timer at ${new Date()}`);
}