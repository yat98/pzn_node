export const sum = (first,second) => first + second;

export const sumAll = (numbers) => {
  let total = 0;
  for(let number of numbers){
    total += number;
  }
  return total;
}