import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, countryArray, countryList } from './model';
import { StorageDataBase } from './storage.database';

@Injectable({
  providedIn: 'root'
})
export class NewsAPIService {
  listURL = 'https://restcountries.eu/rest/v2/all';

  countryCodes = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'

  APIKEY = ''
  //country=&apiKey=
  newsENDPOINT = 'https://newsapi.org/v2/top-headlines?'

  constructor( private http:HttpClient, private db:StorageDataBase) { }
  
  
  async getList():Promise<countryArray> {
    let data = [];
    let countryArray:countryArray;
    let countryData:countryList[] = [];
    const array = this.countryCodes.split(' ');
    const d = await this.http.get(this.listURL).toPromise()
    // @ts-ignore`
    for (let i of d) {
        (array.find(code => {
            if (code == i['alpha2Code'].toLowerCase()) {
              let data:countryList = {
                name: i.name,
                url: i.flag,
                code: i.alpha2Code
              }
              countryData.push(data);
            }
          })
        )
      }
    countryArray = {
      id: '1',
      data: countryData
    }
    await this.db.addList(countryArray)
    return countryArray;
  }

  async getNews (code:string):Promise<Article[]> {
    let d = await this.db.getAPI();
    this.APIKEY = d['apikey'];
    let headers = new HttpHeaders().set('apikey', this.APIKEY);
    headers = headers.set('country', code);
    console.info(this.APIKEY);
    // @ts-ignore
    const data:any[] = await this.http.get((this.newsENDPOINT), {headers: headers}).toPromise()
    const articles:Article[] = data['articles'].map(d => {
      return {
        name: d.source.name,
        author: d.author,
        title: d.title,
        description: d.description,
        url: d.url,
        img: d.urlToImage,
        publishedAt: d.publishedAt,
        content: d.content
      } as Article
    })
    return articles;
  }
}
