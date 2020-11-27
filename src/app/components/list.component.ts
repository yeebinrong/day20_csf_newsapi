import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countryList } from '../model';
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
  countryData = [];
  ngOnInit(): void { 
    this.init()
  }

  async init () {
     this.countryData = await this.NewsSvc.getList()
    await this.db.addList(this.countryData);
  }

  navigateTo(code:string) {
    this.router.navigate(['/detailed', code.toLowerCase()])
  }

}
