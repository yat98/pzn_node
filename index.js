export const sayHello = (name) => `Hello ${name}`;

export const sum = (numbers) => {
  let total = 0;
  for(let number of numbers){
    total += number;
  }
  return total;
}