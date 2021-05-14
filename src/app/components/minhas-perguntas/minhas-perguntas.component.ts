import { EditPerguntaDialogComponent } from './../../dialogs/edit-pergunta-dialog/edit-pergunta-dialog.component';
import { Pergunta } from './../../interfaces/pergunta';
import { User } from './../../interfaces/user';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPerguntaComponent } from './../view-pergunta/view-pergunta.component';

@Component({
  selector: 'app-minhas-perguntas',
  templateUrl: './minhas-perguntas.component.html',
  styleUrls: ['./minhas-perguntas.component.css']
})
export class MinhasPerguntasComponent implements OnInit {
  private user: User;

  toExport: Pergunta[] = [];

  constructor(private as: AuthService, public ds: DataService, public editDialog: MatDialog) {
    this.as.user$.subscribe((u: User) => {
      this.user = u;
      this.ds.getPerguntas(this.user.email);
    });
   }

  ngOnInit(): void {
  }

  deletePergunta(id: string): void {
    this.ds.deletePergunta(this.user.email, id);
  }

  selectPergunta(i): void {
    console.log(this.ds.mPerguntas[i]);
    this.ds.selectedPergunta = this.ds.mPerguntas[i];
  }

  selectedToExport(checked: boolean, index: number, id: string): void {
    if (checked) {
      this.toExport.push(this.ds.mPerguntas[index]);
    } else {
      let i = 0;
      this.toExport.forEach( p => {
        if (p._id === id) {
          this.toExport.splice(i, 1);
        }
        ++i;
      });
    }
  }

  exportPerguntas(): void {
    this.ds.testes[this.ds.tIndex].perguntas.push(...this.toExport);
  }

  edit(index: number): void {
    const dialogRef = this.editDialog.open(EditPerguntaDialogComponent, {
      data: this.ds.mPerguntas[index],
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r.ok) {
        this.ds.saveUpdatePergunta(this.user.email, r.res);
      } else {
        this.ds.getPerguntas(this.user.email);
      }
    });
  }

  view(): void {
    const dialogRef = this.editDialog.open(ViewPerguntaComponent, {
      data: this.ds.selectedPergunta,
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(r => {
      console.log("OK!!!");
    });
  }

}
