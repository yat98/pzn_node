import cluster from 'cluster';
import http from 'http';
import os from 'os';
import process from 'process';

if(cluster.isPrimary){
  console.log(`primary ${process.pid}`);
  
  for(let i = 0; i < os.cpus().length; i++){
    cluster.fork();
  }

  cluster.addListener('exit', function(worker){
    console.info(`Worker ${worker.id} is exited`);
    cluster.fork();
  });
}

if(cluster.isWorker){
  console.log(`worker ${process.pid}`);

  const server = http.createServer((request, response) => {
    response.write(`Response from process ${process.pid}`);
    response.end();
    process.exit();
  });
  server.listen(3000);
  console.info(`Start cluster worker ${process.pid}`);
}