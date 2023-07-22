export const min = (first, second) => {
  if(first > second){
    return second;
  }else{
    return first;
  }
}

export const max = (first, second) => {
  if(first < second){
    return second;
  }else{
    return first;
  }
}