import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationFirestoreService } from './conversation-firestore.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private conversationService : ConversationFirestoreService) {}
  chunks:Blob[]=[]
  messages:any = []
  recording = false;
  currentMessage:any;
  currentConversation:any;
  currentParticipant:any;
  message:string;
  conversations:any;
  conversationProfiles:any;
  title = 'chat_assist_caller';
  mediaRecorder:MediaRecorder;
  articles = new Array();
  options = {
    audioBitsPerSecond: 48000,
    mimeType: "audio/webm;codecs=opus",
  };
  ngOnInit(): void{
    this.conversations = this.conversationService.getConversations();
    this.conversationProfiles = this.conversationService.getConversationProfiles();

  }
  createConversation(){
  this.conversationService.addConversation().subscribe(result => {console.log(result);this.conversations.push(result)});
  }
  createParticipant(participant_type:string){
   this.conversationService.addParticipant(this.currentConversation,participant_type).subscribe(result => {this.currentParticipant = {id:result.toString(),type:participant_type};console.log(result)});
  }

  conversationChange(event:any){
    console.log(event);
    this.currentConversation = this.conversationService.getConversation(event.value);
  }

  analyzeMessage(content:string,type:string){
    this.message = "";
    this.conversationService.analyzeMessage(this.currentParticipant['id'],content,type).subscribe(result => {
      let message = {content:result['text'],participant_type:this.currentParticipant['type'],send_time:result['send_time'],};
      console.log(result);
      this.articles = result['articles'];
      this.messages.push(message)
      console.log(this.articles)
  })
  }
  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.recording = true;
      console.log("ACTIVATING AUDIO STREAM");
    this.mediaRecorder = new MediaRecorder(stream,this.options);
    this.mediaRecorder.start();
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
      console.log("CHUNKS RECEIVED!")
      console.log(this.chunks);
      let blob = this.chunks[0];
      this.conversationService.sendAudio(this.currentParticipant['id'],blob,'audio').subscribe(result => {let message = {content:result['text'],participant_type:this.currentParticipant['type'],send_time:result['send_time'],};
      console.log(result);
      this.articles = result['articles'];
      this.messages.push(message)
      console.log(this.articles)})
    }
    console.log(this.mediaRecorder.state);
    console.log("recorder started");
  })
}
  stopRecording() {
    this.recording = false;
    this.mediaRecorder.stop();
  }
  
}
