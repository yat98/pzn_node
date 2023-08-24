import net from 'net';
import process from 'process';

const connection = net.createConnection({port: 3000, host: 'localhost'});

setInterval(function(){
  // connection.write('Hidayat\r\n');
  connection.write(process.argv[2]+'\r\n');
}, 2000);

connection.addListener('data', (data) => {
  console.info(`Receive data from server : ${data.toString()}`);
})