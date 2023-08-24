function samplePromise()
{
  return Promise.resolve('Success');
}

async function run()
{
  const status = await samplePromise();
  console.log(status);
}

// Success
console.log(run());

// Error
// const status = await samplePromise();
// console.log(status);