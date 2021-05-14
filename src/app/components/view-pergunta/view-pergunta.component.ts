import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pergunta } from 'src/app/interfaces/pergunta';
import { DataService } from 'src/app/services/data.service';
import { ShuffleService } from 'src/app/services/shuffle.service';
import { MinhasPerguntasComponent } from '../minhas-perguntas/minhas-perguntas.component';

@Component({
  selector: 'app-view-pergunta',
  templateUrl: './view-pergunta.component.html',
  styleUrls: ['./view-pergunta.component.css']
})
export class ViewPerguntaComponent implements OnInit {
  sPergunta: Pergunta;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pergunta, public ss: ShuffleService,public dref: MatDialogRef<MinhasPerguntasComponent>) { 
    this.sPergunta = data;
    dref.disableClose = true;
  }

  ngOnInit(): void {
  }

  ok(): void {
    this.dref.close({ok: true, res: this.sPergunta});
  }

  convAlternativas(pos: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvxwyz';
    return `(${alphabet[pos].toUpperCase()}) `;
  }

}
