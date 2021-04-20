import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map , switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastServiceService {
url ='https://api.openweathermap.org/data/2.5/weather?q=';
apikey ='a09b408b0b1740f5a47508425e139a09';
foreCastUrl='https://api.openweathermap.org/data/2.5/forecast?q=';
secondId='55f1819a7019b27b0bac5a78879f204d';
array=[];
array2=[];
defLocation='';
myUnit ='metric';
public val=true;
  constructor(private http : HttpClient) { }
  public cityName ="";
  public myUrl:any;
  public myForecastUrl:any;
  public setCity( value:string)
  {
    this.cityName = value;
   this.myUrl =`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=a09b408b0b1740f5a47508425e139a09`;
   this.myForecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=55f1819a7019b27b0bac5a78879f204d`;
   console.log(this.cityName);
    console.log(this.myUrl);
  }
public setArray(array:any)
{
 this.array =array;
//this.array2= this.array;
}
public setDefLocFromComp(defLoc:any)
{
  this.defLocation = defLoc;
  console.log('def loc in service now'+ this.defLocation);
}
public sendDefLoc()
{
  return this.defLocation;
  console.log('sending the ef loc from service'+this.defLocation);
}
public sendArrayToComp()
{
  return this.array;
}

  getWeatherDataByCoords(lat:any,lon:any) :Observable<any>
  {
    let params = new HttpParams()
    .set('lon', lon)
    .set('lat', lat)
    .set('units', this.myUnit)
    .set('appid',this.apikey)

    return this.http.get<any>(this.url, {params});
  }

  getWeatherDataByName() :Observable<any>
  {
     let params = new HttpParams()
     .set('units' , this.myUnit)
      
     return this.http.get(this.myUrl ,{params});
   // return this.http.get(this.myUrl);
  }
  getForeCastByCoords(lat:any ,lon:any)
  {
    let params = new HttpParams()
    .set('lon', lon)
    .set('lat', lat)
    .set('units', this.myUnit)
    .set('appid', this.secondId)
    return this.http.get<any>(this.foreCastUrl,{params});
  }
  getForeCast()
  {
    let params = new HttpParams()
    .set('units' , this.myUnit)
    return this.http.get<any>(this.myForecastUrl ,{params});
  }
  setFinalArray(array:any)
  {
    this.array = array;
    //console.log("Array in the service now "+ this.array);
    this.array2 = array;
    //console.log('array  that u passing'+this.array)
  }
  sendDataToFirstComp()
  {
  //  console.log('you are sending'+this.array2);
    return this.array2;
  }
  sendUnitToService(selectedUnit:any)
  {
    this.myUnit = selectedUnit;
//    console.log('My unit in the service now '+this.myUnit);
  }
}

