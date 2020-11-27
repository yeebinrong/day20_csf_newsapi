import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsAPIService {
  listURL = 'https://restcountries.eu/rest/v2/all';
  data = [];
  countryData = [];
  countryCodes = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'

  APIKEY = '6f73ac4c93f14cdfb3e46dbc569eeb3b'
  //country=&apiKey=
  newsENDPOINT = 'https://newsapi.org/v2/top-headlines?'

  constructor( private http:HttpClient ) { }
  
  getList():Array<Object> {
    const array = this.countryCodes.split(' ');
    console.info(array);
    this.http.get(this.listURL).toPromise()
      .then (d => {
            //@ts-ignore
            for (let i of d) {
              (array.find(code => {
                  if (code == i['alpha2Code'].toLowerCase()) {
                    this.countryData.push(i);
                  }
                })
              )
            }
        }
    )
    return this.countryData;
  }

  getNews (code:string):Promise<Object> {
    return this.http.get((this.newsENDPOINT + `country=${code}&apiKey=${this.APIKEY}`)).toPromise()
  }
}
