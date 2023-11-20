import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
  //  provideFirebaseApp(() => initializeApp(environment.firebase)),
  //  provideFirestore(() => getFirestore()),
  //  provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
