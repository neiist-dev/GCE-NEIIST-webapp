import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pinned-article',
  templateUrl: './gce-articles-pinned.component.html',
  styleUrls: ['./gce-articles-pinned.component.css']
})
export class PinnedArticleComponent implements OnInit {

  @Input() article: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
}