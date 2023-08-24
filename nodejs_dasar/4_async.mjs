function samplePromise()
{
  return Promise.resolve('Success');
}

const status = await samplePromise();
console.log(status);