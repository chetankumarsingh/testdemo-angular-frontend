import { Injectable } from '@angular/core';
import{ ENV }from'./pages/env'
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import{ Http,Headers,RequestOptions }from'@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  ServerPath="https://detexpense.herokuapp.com";  

  constructor(private httpClient: HttpClient,public http:Http) { 

  }


  SignUpService(firstName,LastName,email,password,DeptName,DeptAmtLimit,managementType) {
    let param={ 
      'firstname':firstName,
      'lastname':LastName,
      'DeptAmtLimit':DeptAmtLimit,
      'DeptName':DeptName,
      'managementType':managementType,
      'email':email,
      'password':password,
      'parentID':"0"
    };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/signup',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }


  AddManagerSByDept(firstName,LastName,email,password,DeptName,DeptAmtLimit,managementType) {
    let param={ 
      'firstname':firstName,
      'lastname':LastName,
      'DeptAmtLimit':DeptAmtLimit,
      'DeptName':DeptName,
      'managementType':managementType,
      'email':email,
      'password':password,
      'parentID':localStorage.getItem("LocUsrID"),
    };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/signup',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }

  
  DeptAmtUp(SelectDeptAmtLimit) {
    let param={ 
      'SelectedDeptAmt':SelectDeptAmtLimit,
      'userid':localStorage.getItem("LocUsrID")
    };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/deptmentamtup',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }

  getuserdepart() {
    let param={ 
      'userid':localStorage.getItem("LocUsrID")
    };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/getuserdepart',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }


  LoginService(email: string, pw: string) {
    let param={
      'email':email,
      'password':pw,
    };
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/login',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }

  GetManagerAList(DeptName) {
    let param={
      'DeptName':DeptName, 
      'userid':localStorage.getItem("LocUsrID")
    };
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/managerlist',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }




  AddManagerB(firstName,LastName,email,managementType) {
    let param={ 
      'firstname':firstName,
      'lastname':LastName,
      'managementType':managementType,
      'email':email,
      "userid":localStorage.getItem("LocUsrID")
    };
 let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/addmanagaer_sec',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }


  
  getaddmanagersec() {
    let param={
      'userid':localStorage.getItem("LocUsrID")
    };
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let requestOptions=new RequestOptions({headers:headers});
  return this.http.post(this.ServerPath+'/getaddmanagersec',param,requestOptions).pipe(map(data=>{
    return data.json()
  }));
  }


    // getuserdata() {
    //   return this.httpClient.get(ENV.mainApi+'/user_detail')
    //     .pipe(map(data=>{
    //       return data
    //   }))
    // }

    // getfetchrating() {
    //   return this.httpClient.get(ENV.mainApi+'/fetch_rating')
    //   .pipe(map(data=>{
    //     return data
    //   }))
    // }

    // GetFetchAll() {
    //   return this.httpClient.get('https://health-application.herokuapp.com/fetch_all').pipe(map(data=>{  return data; }));
    // }
  

}
