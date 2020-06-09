import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';

import { ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';

import{SecurityService}from'../../security.service';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService]
})
export class IndexComponent implements OnInit {
	
	 @ViewChild('epltable') epltable: ElementRef;
  clubs = [
    {
      position: 1,
      name: "Liverpool",
      played: 20,
      won: 19,
      drawn: 1,
      lost: 0,
      points: 58
    },
    {
      position: 2,
      name: "Leicester City",
      played: 21,
      won: 14,
      drawn: 3,
      lost: 4,
      points: 45
    },
    {
      position: 3,
      name: "Manchester City",
      played: 21,
      won: 14,
      drawn: 2,
      lost: 5,
      points: 44
    },
    {
      position: 4,
      name: "Chelsea",
      played: 21,
      won: 11,
      drawn: 3,
      lost: 7,
      points: 36
    },
    {
      position: 5,
      name: "Manchester United",
      played: 21,
      won: 8,
      drawn: 7,
      lost: 6,
      points: 31
    }
   ];
   
  showloading: boolean = false;

  public AnimationBarOption;

  TitleMsg:any="Title";
  MessageMsg:any="Message Body";
  LocationMsg:any="Location";

  FirstName:any; LastName:any; EmailID:any;  Passwords:any;
  default_data:any=[];

  DeptName:any="Department1";
  DeptAmtLimit:number=0;
  managementType:any;


  ManagerAData:any=[];
  TesterData:any=[];
  DeveloperData:any=[];
  ManagerDeptAmtLimit:number=0;
  constructor(private _chartsService: ChartsService,public security:SecurityService) {
    
  }  

  ngOnInit() { 

    this.managementType=localStorage.getItem("managementType");

    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    if(this.managementType=='department') {
      this.loadData(); 
    }
    else {
      this.SelfGetManagaerB();
    }
  }

  SelfGetManagaerB() {

    this.security.getuserdepart().subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var getdatatmp=data['getdata'];
        this.ManagerDeptAmtLimit = parseInt(getdatatmp.DeptAmtLimit);
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("Please coonect to developer.");
      console.log('Catch object set:' + e.message);
    });

    this.security.getaddmanagersec().subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var getdatatmp=[];
         getdatatmp=data['message'];

         this.ManagerAData=[];
        this.TesterData=[];
        this.DeveloperData=[];
        var filtermanager="manager";
        var filterDev="developer";
        var filterTester="tester";

        this.ManagerAData=getdatatmp.filter((mitem) => {
          return (mitem.managementType.toString().toLowerCase().indexOf(filtermanager.toLowerCase()) > -1);
        });

        this.DeveloperData=getdatatmp.filter((mitem) => {
          return (mitem.managementType.toString().toLowerCase().indexOf(filterDev.toLowerCase()) > -1);
        });

        this.TesterData=getdatatmp.filter((mitem) => {
          return (mitem.managementType.toString().toLowerCase().indexOf(filterTester.toLowerCase()) > -1);
        });
         console.log("=getdatatmp=",getdatatmp);
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("Please coonect to developer.");
      console.log('Catch object set:' + e.message);
    });
  }
  
  loadData() {

    this.security.GetManagerAList(this.DeptName).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        this.default_data=data['message'];
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("Please coonect to developer.");
      console.log('Catch object set:' + e.message);
    });

    this.security.getuserdepart().subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var getdatatmp=data['getdata'];
        this.DeptAmtLimit = parseInt(getdatatmp.DeptAmtLimit);
        this.DeptName = getdatatmp.DeptName;
        
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("Please coonect to developer.");
      console.log('Catch object set:' + e.message);
    });

    
  }

    exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

  onKeyTitle(event) {
    if(event.target.value == ""){
      this.TitleMsg="Title";
    }
    else {
      this.TitleMsg=event.target.value;
    }
  console.log(event.target.value);
  }
   onKeyMessage(event){
       if(event.target.value == ""){
      this.MessageMsg="Message Body";
    }
    else {
      this.MessageMsg=event.target.value;
    }
    console.log(event.target.value);
  }

  onKeyLocation(event){
       if(event.target.value == ""){
      this.LocationMsg="Location";
    }
    else {
      this.LocationMsg=event.target.value;
    }
    console.log(event.target.value);
  }

  showModalImg() {

  }
  
  AddManagersBtn() {
    this.FirstName=(<HTMLInputElement>document.getElementById("FirstName")).value;
    this.LastName=(<HTMLInputElement>document.getElementById("LastName")).value;
    this.EmailID=(<HTMLInputElement>document.getElementById("EmailID")).value;
    this.Passwords=(<HTMLInputElement>document.getElementById("Passwords")).value;
    let managementType="ManagerA";
    this.DeptName="Department1";
    let MangAmtLimit="0";
    this.security.AddManagerSByDept(this.FirstName,this.LastName,this.EmailID,this.Passwords,this.DeptName,MangAmtLimit,managementType).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var DeptAmtLimitTmp=this.DeptAmtLimit+300;
        this.security.DeptAmtUp(DeptAmtLimitTmp.toString()).subscribe(data=>{
          this.DeptAmtLimit=DeptAmtLimitTmp; 
          this.loadData(); 
          alert(data['message']);
          this.FirstName="";
      this.LastName="";
      this.EmailID="";
      this.Passwords="";
        }, e => {
          alert("No internet connection");
        console.log('Catch object set:' + e.message);
      });
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("No internet connection");
      console.log('Catch object set:' + e.message);
    });

  }

  ManagerInManagerBtn() {
      this.FirstName=(<HTMLInputElement>document.getElementById("FirstName1")).value;
      this.LastName=(<HTMLInputElement>document.getElementById("LastName1")).value;
     this.EmailID=(<HTMLInputElement>document.getElementById("EmailID1")).value;
      let managementType="manager";
    this.security.AddManagerB(this.FirstName,this.LastName,this.EmailID,managementType).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var DeptAmtLimitTmp=this.ManagerDeptAmtLimit+300;
        this.security.DeptAmtUp(DeptAmtLimitTmp.toString()).subscribe(data=>{
          this.ManagerDeptAmtLimit=DeptAmtLimitTmp; 
          this.SelfGetManagaerB();
          this.FirstName="";
          this.LastName="";
          this.EmailID="";
          alert(data['message']);
        }, e => {
          alert("No internet connection");
        console.log('Catch object set:' + e.message);
      });
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("No internet connection");
      console.log('Catch object set:' + e.message);
    });
  }

  ManagerInDevBtn() {
    this.FirstName=(<HTMLInputElement>document.getElementById("FirstName2")).value;
    this.LastName=(<HTMLInputElement>document.getElementById("LastName2")).value;
    this.EmailID=(<HTMLInputElement>document.getElementById("EmailID2")).value;
    let managementType="developer";
    this.security.AddManagerB(this.FirstName,this.LastName,this.EmailID,managementType).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var DeptAmtLimitTmp=this.ManagerDeptAmtLimit+1000; 
        this.security.DeptAmtUp(DeptAmtLimitTmp.toString()).subscribe(data=>{
          this.ManagerDeptAmtLimit=DeptAmtLimitTmp; 
          this.SelfGetManagaerB(); 
          this.FirstName="";
          this.LastName="";
          this.EmailID="";
          alert(data['message']);
        }, e => {
          alert("No internet connection");
        console.log('Catch object set:' + e.message);
      });
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("No internet connection");
      console.log('Catch object set:' + e.message);
    });
  }

  ManagerInQABtn() {
    this.FirstName=(<HTMLInputElement>document.getElementById("FirstName3")).value;
    this.LastName=(<HTMLInputElement>document.getElementById("LastName3")).value;
    this.EmailID=(<HTMLInputElement>document.getElementById("EmailID3")).value;
    let managementType="tester";
    this.security.AddManagerB(this.FirstName,this.LastName,this.EmailID,managementType).subscribe(data=>{
      console.log(data);
      if(data['statusCode'] == 200) { 
        var DeptAmtLimitTmp=this.ManagerDeptAmtLimit+500;
        this.security.DeptAmtUp(DeptAmtLimitTmp.toString()).subscribe(data=>{
          this.ManagerDeptAmtLimit=DeptAmtLimitTmp; 
          this.SelfGetManagaerB(); 
          this.FirstName="";
          this.LastName="";
          this.EmailID="";
          alert(data['message']);
        }, e => {
          alert(data['message']); 
        console.log('Catch object set:' + e.message);
      });
      }
      if(data['statusCode'] == 300) {
       alert(data['message']);
      }
    }, e => {
        alert("No internet connection");
      console.log('Catch object set:' + e.message);
    });
  }

  hideModal1():void {
    document.getElementById('close-modal1').click(); 
  }

}
