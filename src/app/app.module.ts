import { AddtestedialogComponent } from './dialogs/addtestedialog/addtestedialog.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../app/route.module';
import { CKEditorModule } from 'ckeditor4-angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { SafePipe } from './safe.pipe';
import { CreateComponent } from './components/create/create.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrordialogComponent } from './dialogs/errordialog/errordialog.component';
import { CreatePerguntaComponent } from './components/create-pergunta/create-pergunta.component';
import { MinhasPerguntasComponent } from './components/minhas-perguntas/minhas-perguntas.component';
import { EditPerguntaDialogComponent } from './dialogs/edit-pergunta-dialog/edit-pergunta-dialog.component';
import { ViewPerguntaComponent } from './components/view-pergunta/view-pergunta.component';
import { JsonprettyPipe } from './jsonpretty.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    CreateComponent,
    ViewComponent,
    EditComponent,
    LoginoutComponent,
    AddtestedialogComponent,
    ErrordialogComponent,
    CreatePerguntaComponent,
    MinhasPerguntasComponent,
    EditPerguntaDialogComponent,
    ViewPerguntaComponent,
    JsonprettyPipe
  ],
  imports: [
    BrowserModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule,
    AppRoutingModule,
    CKEditorModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    AddtestedialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
