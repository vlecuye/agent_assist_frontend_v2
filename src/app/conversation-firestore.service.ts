import { Injectable } from '@angular/core';
import { Firestore,collection,CollectionReference,DocumentData,addDoc,onSnapshot, docData,collectionData,doc,arrayUnion,updateDoc, } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConversationFirestoreService {
 // private conversationCollection: CollectionReference<DocumentData>;
  conversations =  new Array();
  constructor( private http:HttpClient) {
  //  this.conversationCollection = collection(this.firestore, 'conversations');
  }
  public addConversation(){
    let payload = {"project_uid":"quebec-ccai-demo","conversation_profile_id":"1BtGBnXNSrSnXAea4YjG5w"};
    return this.http.post(environment.serviceUri+'/conversation/create',payload)
  }

  public getConversations(){
    return this.conversations;
    
  }

  public getConversationProfiles(){
    this.http.get('')
  }
  public getConversation(id:string){
    console.log(id);
    return this.conversations[0];
  // return docData(doc(this.conversationCollection,id),{idField:'id'});
  }

  public addParticipant(conversationID:any,participant_type:string){
    let payload = {"project_id":"quebec-ccai-demo","conversation_id":conversationID,"role":participant_type}
    return this.http.post(environment.serviceUri +'/participant/create',payload);

  }
  public analyzeMessage(participantID:string,message:string,type:string){
    let data = new FormData;
    data.append('participant_id',participantID);
    data.append('text',message);
    data.append('type',type);
    return this.http.post(environment.serviceUri+'/conversation/analyze',data);
  }

  public async publishMessage(message:any,articles:any,conversation_id:any)
  {
    console.log(message);
    console.log(articles);
    // let docRef = doc(this.conversationCollection,conversation_id.id)
   // await updateDoc(docRef,{messages:arrayUnion(message),articles:articles}).then(result => console.log(result));

  }
  public sendAudio(participantID:string,blob:Blob,type:string) {
    let data = new FormData;
    data.append('participant_id',participantID);
    data.append('type',type);
    data.append('blob',blob);
    console.log(blob);
    return this.http.post(environment.serviceUri+"/conversation/analyze",data);
  }
}
