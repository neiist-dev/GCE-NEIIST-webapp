import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Http } from "@angular/http";
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {Headers} from "@angular/http";

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private authService: AuthService, private http: Http) { }
  currentMessage: Message;
  messageToSend: string;

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    //fazer chamada a backend, obter resposta e atualizar a mensagem, com update
    const messageToSend = {
      message: msg,
    };
    this.sendMessage(messageToSend).subscribe(data =>  {
        console.log(data);
      this.currentMessage = new Message (data, 'bot');
    });

    this.update(this.currentMessage);
  }

  createSession() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.loadTokenUser(headers);
    return this.http.post('chatbot/session', '', {headers: headers}).pipe(map(res => res.json()));
  }

  sendMessage(message) {
    console.log("AAAAAAAAAAAAA MESSAGE IS:"+message);
    const messageToSend = JSON.stringify(message);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.loadTokenUser(headers);
    return this.http.post('chatbot/message', message, {headers: headers}).pipe(map(res => res.json()));
  }


}
