import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countryArray, countryList } from '../model';
import { NewsAPIService } from '../news-api.service';
import { StorageDataBase } from '../storage.database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private NewsSvc: NewsAPIService, private db: StorageDataBase, private router:Router) { }
  list = []
  CountryArray:countryArray;
  countryData:countryList[];
  ngOnInit(): void { 
    this.db.getList()
    .then(data => {
      this.CountryArray = data;
      this.countryData = this.CountryArray['data'];
      console.info("db")
    }).catch(e => {
      console.info("not db")
      this.getList()
    })
  }
  
  getList() {
    this.NewsSvc.getList()
    this.db.getList()
    .then(data => {
      this.CountryArray = data;
      console.info(data)
    })
  }

  navigateTo(code:string) {
    this.router.navigate(['/detailed', code.toLowerCase()])
  }

}
