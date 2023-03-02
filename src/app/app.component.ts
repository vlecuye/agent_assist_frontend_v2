import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationFirestoreService } from './conversation-firestore.service';
import {DocumentData} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private conversationService : ConversationFirestoreService, public authService:AuthService) {}
  currentMessage:any;
  currentConversation:any;
  currentParticipant:any;
  message:string;
  conversations$: Observable<DocumentData[]>;
  conversationProfiles:any;
  title = 'chat_assist_caller';

  ngOnInit(): void{
    this.conversations$ = this.conversationService.getConversations();
    this.conversationProfiles = this.conversationService.getConversationProfiles();

  }
  createConversation(){
  this.conversationService.addConversation();
  }
  createParticipant(participant_type:string){
   this.conversationService.addParticipant(this.currentConversation,participant_type).subscribe(result => {this.currentParticipant = {id:result.toString(),type:participant_type};console.log(result)});
  }

  conversationChange(event:any){
    console.log(event);
    this.conversationService.getConversation(event.value).then(result => {result.subscribe(result => {this.currentConversation=result;console.log(result)})});
  }
  analyzeMessage(content:string){
    this.conversationService.analyzeMessage(this.currentParticipant['id'],content).subscribe(result => {
      let message = {content:content,participant_type:this.currentParticipant['type'],send_time:result['send_time']};
      console.log(result);
      this.conversationService.publishMessage(message,result['articles'],this.currentConversation);
  })
}

login(){
  this.authService.login();
  
}

logout(){
  this.authService.logout();
}
}
