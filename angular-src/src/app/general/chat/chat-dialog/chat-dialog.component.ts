import { ChatService, Message } from './../chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  scroller: any;
  sessionId: any;

  constructor(private chatService: ChatService) { }

  ngOnInit() {

    // appends to array after each new message is added to feedSource
    this.messages = this.chatService.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );

    // If we want the user to have the sessionId. As the sessionIds are stored
    // in a map on the backend, per user, there is no need for the clients to have the token
    /*
    this.chatService.createSession().subscribe(data =>  {
        this.sessionId = data.response_data.session_id;
    });
    */
    this.chatService.createSession().subscribe();
    this.chatService.delay(2000).then(any => {
      this.chatService.initMessage();
    });


  }

  ngOnDestroy() {
    this.chatService.destroySession().subscribe();
    this.formValue = '';
  }

  sendMessage() {
    this.chatService.converse(this.formValue);
    this.formValue = '';
  }

}
