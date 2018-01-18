import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {

  public uploader:FileUploader;
  resume: File;
  FileItem: File;

  constructor(private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: 'http://localhost:8080/gce/saveCVHashCode',
      //authToken: localStorage.getItem('authToken'),
      headers: [{name:'Accept', value:'application/json'}],
      autoUpload: false
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let parsedResponse = JSON.parse(response);
    if (parsedResponse.succeeded)  {
      this.flashMessage.show("Upload feito com sucesso!", {cssClass: 'alert-success', timeout: 10000});
    } else {
      item.isSuccess = false;
      item.isError = true;
      this.flashMessage.show(parsedResponse.message, {cssClass: 'alert-danger', timeout: 10000});
    }
  }


}
