import https from 'https';

const endpoint = 'https://mockbin.org/bin/5e72960a-a99a-4325-a395-4d84e29e2075';
const request = https.request(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}, (response) => {
  response.addListener('data', function(data){
    console.log(`Receive data : ${data.toString()}`);
  });
});

const body = JSON.stringify({
  firstName: 'Hidayat',
  lastName: 'Chandra'
});

request.write(body);
request.end();