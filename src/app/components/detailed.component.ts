import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private newsSvc: NewsAPIService, private activatedRoute: ActivatedRoute, private db:StorageDataBase) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['country'];
    this.retrieveNews();

  }

  retrieveNews() {
    this.db.getArticle(this.code)
    .then (d => {
      this.detailed = d.articles;
      console.info("article from db")
    }).catch (e => {
      this.newsSvc.getNews(this.code)
        .then (data => {
          this.detailed = data;
          this.db.addArticle(this.detailed, this.code);
          console.info("added article")
        })
    })
  }

}
