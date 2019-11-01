import { Component, OnInit } from '@angular/core';
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

  constructor(private articlesService: ArticlesService,
              private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articles = [];
    this.articlesService.getAllArticles().subscribe(res => {
        this.articles = res.response_data.articles;
        this.numberArticles = res.response_data.number;
    });
  }

}
