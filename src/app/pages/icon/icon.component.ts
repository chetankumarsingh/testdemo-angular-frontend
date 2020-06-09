import { Component, OnInit,ViewChild } from '@angular/core';
import{SecurityService}from'../../security.service'
import {} from 'googlemaps';

 // This lets me use jquery

 declare var google:any;
 declare var $: any;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit { 

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

 
  data=[];

  default_data=[]
  image=[]
  type=[]
   
  ImageSlide;
  ImageSlide1;
  constructor(public security:SecurityService) { }

  ngOnInit() {
 
    this.ImageSlide=[];
	  this.data=[];
    this.loadData();
  }

  loadData() { 
      // this.security.getfetchrating().subscribe(data=>{
      //   console.log("default_data==",data); 
      //       this.data=data["message"]
      //   for(var i=0;i<this.data.length;i++)
      //   {
      //       this.default_data.push({
      //       name:this.data[i].userid.firstname,
      //       change_table:this.data[i].change_table,
      //       childers_toilet:this.data[i].childers_toilet,
      //       hooks_in_change_room:this.data[i].hooks_in_change_room,
      //       nursing:this.data[i].nursing,
      //       stroller_friendly:this.data[i].stroller_friendly,
      //       children:this.data[i].type[0].children,
      //       men:this.data[i].type[0].men,
      //       neutral:this.data[i].type[0].neutral,
      //       woman:this.data[i].type[0].woman,
      //       lat:this.data[i].location[0].lat,
      //       lng:this.data[i].location[0].lng,
      //       array_img:this.data[i].array_img
      //     })
      //   }
      //   console.log("default_data==",this.default_data); 
      // })
  }

  showModal(lat,lng) {
    $("#myModal").modal('show');
    const mapProperties = {
      center: new google.maps.LatLng(lat,lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    animation:google.maps.Animation.BOUNCE
  });
  marker.setMap(this.map);
  }

  showModalImg(ImgArr){
    this.ImageSlide1=""; 
    this.ImageSlide=[];  
    for(let j=0;j<ImgArr.length;j++){ 
    if(j==0) { this.ImageSlide1=ImgArr[j].Image; }
    else { this.ImageSlide.push({_id:ImgArr[j]._id,Image:ImgArr[j].Image}); }
    }
    var temstring ='<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
    for(let i=1;i<ImgArr.length;i++){
      temstring +='<li data-target="#myCarousel" data-slide-to="'+i+'" ></li>';  
    }
    $( ".carousel-indicators" ).append(temstring); 
  }

  sendModal(): void {
    this.hideModal();
  }

  hideModal():void {
    document.getElementById('close-modal').click();
  }

  hideModal1():void {
    document.getElementById('close-modal1').click();
  }


}
