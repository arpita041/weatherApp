import { Component, OnInit } from '@angular/core';
import { ForecastServiceService } from '../forecast-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
 public array =[];
 public btn = false;
 public arrayVal: string = '';
 public index:number = 1;
 public cityName='';
 public addedArray:string[]=[];
 public count =1;
 public defLoc='';
 public selectedUnit='';
 public localContent:any;
 public myObj:any;
 public locArray=[];
 public locArray2:any;
 public showButton()
 { 
   this.btn = true;
 }
 
  constructor( private myService :ForecastServiceService) { }
  setOptionValue(event :any)
  {
    this.arrayVal = event.target.value;
    console.log("value to delete"+this.arrayVal);
  }
  deleteFromArray(value:any)
  {
     for (let i = 0; i < this.array.length; i++) {
        if(this.array[i]== this.arrayVal)
        {
          this.array.splice(i,1);
        }       
     }
     this.addedArray = this.array;
    // console.log('ARRAY IN THE setting'+this.array);
     this.myService.setFinalArray(this.array);
  }

  ngOnInit(): void {
     console.log('Service here');
    this.array = this.myService.sendDataToFirstComp();
    console.log('initial array'+this.array);
    for (let i = 0; i < this.array.length; i++) {
      const element = this.array[i];
      localStorage.setItem(`Location${i+1}`,element);
      this.locArray2 = localStorage.getItem(`Location${i+1}`);
      console.log("loc array 2"+this.locArray2);
      console.log('element is :'+element);
    }
    console.log('semt def loc init'+this.defLoc);
  //  localStorage.setItem('Current Location', this.array[0]);
  }
  addInArray(cityName:any)
  {
 this.array= this.array.concat(cityName);
 console.log('prev array now'+this.array);
  //console.log('Added in setting compo'+this.addedArray);
  this.addedArray = this.array;
  this.myService.setFinalArray(this.addedArray);
  //this.array = this.myService.sendDataToFirstComp();
   localStorage.setItem(`location${this.count}`,cityName);
   this.localContent = localStorage.getItem(`location${this.count}`);
   this.locArray = this.locArray.concat(this.localContent);
   console.log("Loc storeage"+this.localContent);
   this.count =this.count+1;
  }
  setDefaultLocation(loc:any)
  {
 this.defLoc = loc;
 console.log('defLoc in setting component'+this.defLoc);
 this.myService.setDefLocFromComp(this.defLoc);
  }
  radioChangeHandler(event :any)
  {
    this.selectedUnit = event.target.value;
    console.log(this.selectedUnit);
    this.myService.sendUnitToService(this.selectedUnit);
  }
}
