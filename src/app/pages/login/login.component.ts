import { Component, OnInit } from '@angular/core';
import { SecurityService } from'../../security.service';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../shared/models/tabs-model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  EmailID:any=null;
  Passwords:any=null;

  EmailID1;
  Passwords1;

  DeptName
  constructor(public security:SecurityService,private router: Router
  //  ,private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    
  }

  public signUp() {
    this.router.navigate(['/signUp']);
  }

  login() {
    this.EmailID=(<HTMLInputElement>document.getElementById("EmailID")).value;
    this.Passwords=(<HTMLInputElement>document.getElementById("Passwords")).value;
    this.security.LoginService(this.EmailID,this.Passwords).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
          console.log("==d==",data['data']);
          var MsgData=data['data'];
          console.log("==MsgData._id==",MsgData._id);
        localStorage.setItem("LocUsrID",MsgData._id);
        console.log("LOcUSR=",localStorage.getItem("LocUsrID"));
        localStorage.setItem("DeptName",MsgData.DeptName);
        localStorage.setItem("DeptAmtLimit",MsgData.DeptAmtLimit);

        localStorage.setItem("managementType",MsgData.managementType);
        localStorage.setItem("email",MsgData.email);
        localStorage.setItem("firstname",MsgData.firstname);
        localStorage.setItem("lastname",MsgData.lastname);

         localStorage.setItem("LoginAccess","login");
         alert(data['message']);
        this.onSuccessNavigate();
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
      this.openSnackBarMsg(e.message);
      console.log('Catch object set:' + e.message);
    });
  }

  openSnackBarMsg(message) {
    //this.snackBar.open(message, '', {duration: 2000});
  }
  onSuccessNavigate() {
    this.router.navigate(['/index']);
  }


  RegisterBtn() {
    this.DeptName=(<HTMLInputElement>document.getElementById("DeptName")).value;
    this.EmailID1=(<HTMLInputElement>document.getElementById("emailid")).value;
    this.Passwords1=(<HTMLInputElement>document.getElementById("passwordd")).value;
    var FirstName="dd";   var LastName="dd";
    let managementType="department";
    let MangAmtLimit="0";
    this.security.SignUpService(FirstName,LastName,this.EmailID1,this.Passwords1,this.DeptName,MangAmtLimit,managementType).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
          alert(data['message']);
      this.DeptName="";
      this.EmailID1="";
      this.Passwords1="";
      (<HTMLInputElement>document.getElementById("DeptName")).value="";
      (<HTMLInputElement>document.getElementById("emailid")).value="";
      (<HTMLInputElement>document.getElementById("passwordd")).value="";
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
      if(data['statusCode'] == 500) {
        alert(data['message']);
       }
    }, e => {
      console.log(e);
        alert("No internet connection");
        if(e['statusCode'] == 300) {
          console.log(e['statusCode']);
         }
      console.log('Catch object set:' + e.message);
    });

  }

  // registerBtn() { 
  //   let DeptAmtLimit=0; 
  //   let managementType="department";
  //   this.security.SignUpService(this.currentUser.email,this.currentUser.password,this.currentUser.DeptName,DeptAmtLimit,managementType).subscribe(data=>{
  //     console.log(data);
  //     console.log(data['statusCode']);
  //     this.isLoading = false;
  //     if(data['statusCode'] == 200) { 
  //       this.openSnackBarSuccess(data['message']);
  //       this.onSuccessfulSignUp();
  //     }
  //     if(data['statusCode'] == 300) {
  //       this.openSnackBarSuccess(data['message']);
  //     }
  //   }, e => {
  //     this.isLoading = false;
  //     this.openSnackBarError(e.message);
  //     console.log('Catch object set:' + e.message);
  //   });
  // }



}
