import { Component, OnInit } from '@angular/core';
import{SecurityService}from'../../security.service';
import { from } from 'rxjs';

interface Provider {
  Children: string,
  create_date: string,
  email: string,
  password: string,
  status: string,
  __v: string,
  __id: string
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  default_data=[]
  //data=[]
  //defaultContent = '<h3>Friday favorites - Homemade pizza</h3><p><br></p><p>Friday is finally here! I know it’s been an exhausting week and the last thing on your mind right</p><p> now is getting stuck in the kitchen preparing a snack to accompany you during your regular Netflix session.</p><img src="http://f10.baidu.com/it/u=870634439,1838112237&amp;fm=72">'
  constructor(public security:SecurityService) { }

  ngOnInit() {
  //  document.getElementById('text-output').innerHTML = this.defaultContent;
  this.loadData();
  }

  //onContentChange(event: string) {
   // document.getElementById('text-output').innerHTML = event;
  //}

  loadData() { 
    // this.security.getuserdata().subscribe(data=>{
    //   for(var i=0;i<data["message"].length;i++)
    //   {   
    //     if(data["message"][i].firstname)
    //     {
    //       this.default_data.push({ 
    //       name:data["message"][i].firstname,
    //       email:data["message"][i].email,
    //       mobile:data["message"][i].mobile,
    //       childern:data["message"][i].Children.length,
    //       status:data["message"][i].status
    //     })
    //     }   
    //   }
    // })
  }

 

}