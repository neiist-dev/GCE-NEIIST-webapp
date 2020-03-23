import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-gce-articles',
  templateUrl: './gce-articles.component.html',
  styleUrls: ['./gce-articles.component.css']
})

export class GceArticlesComponent implements OnInit {
  articles: any[];
  numberArticles: number = 0;
  loading: true;
  pinnedArticle: any;

  constructor(private articlesService: ArticlesService,
              private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articlesService.getAllArticles().subscribe(res => {
        this.articles = res.response_data.articles;
        this.numberArticles = res.response_data.number;

        this.pinnedArticle = this.articles[0];
    });
  }

}
