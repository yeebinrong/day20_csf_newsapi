import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Article } from '../model';
import { NewsAPIService } from '../news-api.service';
import { StorageDataBase } from '../storage.database';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent implements OnInit {
  code:string;
  detailed:Article[] = [];
  checkAPI:boolean = false;
  constructor(private newsSvc: NewsAPIService, private activatedRoute: ActivatedRoute, private db:StorageDataBase) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['country'];
    this.retrieveNews();

  }

  retrieveNews() {
    this.db.getArticle(this.code)
    .then (d => {
      console.info("article from db")
      if (moment(d.time).add(5, 'minutes').toDate() > new Date()) {
        // 5 minutes havent passed
        console.info("5minutes have not passed")
        this.detailed = d.articles;
      } else {
        // 5 minutes passed
        console.info("5 minutes passed")
        this.newsSvc.getNews(this.code)
        .then (data => {
            this.detailed = data;
            this.db.addArticle(this.detailed, this.code);
            console.info("added article")
          }).catch(e => {
            console.info("check api")
            this.checkAPI = true;
        })
      }
    }).catch (e => {
      this.newsSvc.getNews(this.code)
        .then (data => {
          this.detailed = data;
          this.db.addArticle(this.detailed, this.code);
          console.info("added article")
        }).catch(e => {
          console.info("check api")
          this.checkAPI = true;
        })
    })
  }

}
