import { Component, OnInit } from '@angular/core';
import { ForecastServiceService } from '../forecast-service.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  lat:any;
  lon:any;
  weather:any;
  val:boolean=true;
  val2:boolean =true;
  public array =[];
  public defLoc='';
  public foreCast:any;
    //public array2 =[];
  constructor( private myService: ForecastServiceService ) { }
  selectedCity: string = '';

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedCity = event.target.value;
   this.myService.setCity(this.selectedCity);
   this.getWeather();
   // this.myService.getCity(this.selectedCity);
  }
  ngOnInit(): void {
    if(this.val)
    {
      this.val2 =false;
         this.getLocation();
    }
    this.myService.setArray(this.array);
   // console.log('today comp array:+'+this.array);
    this.updatedArray();
   // console.log('array in today after update+'+this.array);
    this.defLoc =this.myService.sendDefLoc();
   // console.log('def loc in ts '+ this.defLoc);   
    if(this.defLoc.length >0)
    {
     // console.log('length is'+this.defLoc.length);
        this.myService.setCity(this.defLoc);
        this.getWeather();
    }
    else 
    {
      this.getLocation();
    }
  }
 getLocation()
 {
   if('geolocation' in navigator)
   {
     navigator.geolocation.watchPosition((success)=>
     {
       this.lat=success.coords.latitude;
       this.lon =success.coords.longitude;
       this.myService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data=>
        {
          this.weather= data;
        //  console.log(data);
       //   console.log('weatherrr'+this.weather);
        })
        this.myService.getForeCastByCoords(this.lat, this.lon).subscribe(data =>
          {
            this.foreCast=data.list;
          //  console.log("Prediction value"+this.foreCast);
          })
     })
   }
 }
 getWeather()
 {
    this.myService.getWeatherDataByName().subscribe(data =>
      {
        this.weather = data;
    //    console.log(data);
      }
      )
      this.myService.getForeCast().subscribe(data=>
        {
          this.foreCast =data.list;
        //  console.log("forecast with city name"+data);
        })
 }
updatedArray()
{
   this.array= this.myService.sendDataToFirstComp();
//   console.log('Array in the 1st component now :'+ this.array);  
}
}
