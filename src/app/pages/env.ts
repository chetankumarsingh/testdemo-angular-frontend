const HTTP_TIMEOUT:number=20000;
export interface Enviroment{
    mainApi:string,
    timeout:number
}
export const Live:Enviroment={
    mainApi:'http://diaperchange.herokuapp.com',
    timeout:HTTP_TIMEOUT
}
export const ENV:Enviroment=Live;