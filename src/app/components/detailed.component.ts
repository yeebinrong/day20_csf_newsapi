import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsAPIService } from '../news-api.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent implements OnInit {
  code:string;
  detailed;
  constructor(private newsSvc: NewsAPIService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['country'];
    this.newsSvc.getNews(this.code)
      .then (data => {
        this.detailed = data['articles'];
        console.info(this.detailed['0'].content);
      })
  }

}
