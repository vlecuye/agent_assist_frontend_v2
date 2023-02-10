import { Injectable } from '@angular/core';
import { Firestore,collection,CollectionReference,DocumentData,addDoc,onSnapshot, docData,collectionData,doc,arrayUnion,updateDoc, } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConversationFirestoreService {
  private conversationCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private http:HttpClient) {
    this.conversationCollection = collection(this.firestore, 'conversations');
  }

  public addConversation(){
    let payload = {"project_id":"vlecuyer-cx-demo","conversation_profile_id":"gCb2yRt6RK63zxhlBJ8Fbw"};
    this.http.post(environment.serviceUri+'/conversation/create',payload).subscribe(result => {  addDoc(this.conversationCollection,{'conversationID':result});console.log(result)})
  }

  public getConversations(){
    return collectionData(this.conversationCollection,{idField:'id'});
    
  }

  public getConversationProfiles(){
    this.http.get('')
  }
  public async getConversation(id:string){
    console.log(id);
    return docData(doc(this.conversationCollection,id),{idField:'id'});
  }

  public addParticipant(conversationID:any,participant_type:string){
    let payload = {"project_id":"vlecuyer-cx-demo","conversation_id":conversationID.conversationID,"role":participant_type}
    return this.http.post(environment.serviceUri +'/participant/create',payload);

  }
  public analyzeMessage(participantID:string,message:string){
    let payload = {"participant_id":participantID,"text":message}
    return this.http.post(environment.serviceUri+'/conversation/analyze',payload);
  }

  public async publishMessage(message:any,articles:any,conversation_id:any)
  {
    console.log(message);
    console.log(articles);
    let docRef = doc(this.conversationCollection,conversation_id.id)
    await updateDoc(docRef,{messages:arrayUnion(message),articles:articles}).then(result => console.log(result));

  }
}
