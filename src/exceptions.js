export class MyException extends Error{

}

export const callMe = (name) => {
  if(name === 'Hidayat'){
    throw new MyException("Ups my exceptions happens");
  }else{
    return 'OKE';
  }
}
