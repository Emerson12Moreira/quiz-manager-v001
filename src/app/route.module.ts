import { MinhasPerguntasComponent } from './components/minhas-perguntas/minhas-perguntas.component';
import { CreatePerguntaComponent } from './components/create-pergunta/create-pergunta.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewPerguntaComponent } from './components/view-pergunta/view-pergunta.component';

const routes: Routes = [
  {path: 'loginout', component: LoginoutComponent},
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'minhas-perguntas', component: MinhasPerguntasComponent, canActivate: [AuthGuard]},
  {path: 'create-pergunta', component: CreatePerguntaComponent, canActivate: [AuthGuard]},
  {path: 'view', component: ViewComponent, canActivate: [AuthGuard]},
  {path: 'view-pergunta', component: ViewPerguntaComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'create'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
