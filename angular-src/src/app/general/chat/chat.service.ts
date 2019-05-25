import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Http } from "@angular/http";
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {Headers} from "@angular/http";
import {ThesisService} from "../../services/thesis.service";
import {Router} from "@angular/router"

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  idsBot: number[];

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private authService: AuthService,
              private thesisService: ThesisService,
              private http: Http,
              private router: Router) {
    this.thesisService.currentIds.subscribe(ids => this.idsBot = ids);
  }
  currentMessage: Message;
  messageToSend: string;

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then();
  }
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    //fazer chamada a backend, obter resposta e atualizar a mensagem, com update
    const messageToSend = {
      message: msg,
    };
    this.sendMessage(messageToSend).subscribe(data => {
      console.log(data);
      /**
       *Data:
       * message: from the backend we send responseData.output.generic[0].text as the field "message"
       * response_data  {
       *     output {
       *         entities
       *         generic
       *         intents
       *     }
       * }
       * */
      for (let message of data.response_data.output.generic) {
        this.currentMessage = new Message(message.text, 'bot');
        this.update(this.currentMessage);
      }
      if (data.response_data.desiredTheses) {
        const thesesIdList = data.response_data.desiredTheses;
        this.thesisService.changeIdsBot(thesesIdList);
        let msg = new Message("Alright, redirecting in 3...", "bot");
        this.update(msg);
        this.delay(3000).then(any => {
          this.router.navigate(['/thesis'])
        });

        //mudar vista com o router
      }

    })
  }

  initMessage() {
    //fazer chamada a backend, obter resposta e atualizar a mensagem, com update
    const messageToSend = {
      message: '',
    };
    this.sendMessage(messageToSend).subscribe(data => {
        const msg = new Message(data.message, "bot");
        this.update(msg);
    });
  }
  createSession() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.loadTokenUser(headers);
    return this.http.post('chatbot/session', '', {headers: headers}).pipe(map(res => res.json()));
  }

  destroySession() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.loadTokenUser(headers);
    return this.http.post('chatbot/destroySession', '', {headers: headers}).pipe(map(res => res.json()));
  }

  sendMessage(message) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.authService.loadTokenUser(headers);
    return this.http.post('chatbot/message', message, {headers: headers}).pipe(map(res => res.json()));
  }


}
