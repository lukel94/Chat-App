import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { LoadingService } from './loading.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatroomService {

  public chatrooms: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;

  
  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { 
    this.chatrooms = db.collection('chatrooms').valueChanges();
    
    this.selectedChatroom = this.changeChatroom.pipe(
      switchMap((chatroomId => {
        if(chatroomId) {
          // this.loadingService.isLoading.next(true);
          return db.doc(`chatrooms/${chatroomId}`).valueChanges();
        }
        return of(null);
      }))
    );

    this.selectedChatroomMessages = this.changeChatroom.pipe(
      switchMap((chatroomId => {
        if(chatroomId) {
          // this.loadingService.isLoading.next(true);
          return db.collection(`chatrooms/${chatroomId}/messages`, ref => {
            return ref.orderBy('createdAt', 'desc').limit(100);
          }).valueChanges().pipe(map(arr => arr.reverse()));
        }
        return of(null);
      }))
    );
  }

  public createMessage(text: string): void {
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };

    this.db.collection(`chatrooms/${chatroomId}/messages`).add(message);
  }
}
