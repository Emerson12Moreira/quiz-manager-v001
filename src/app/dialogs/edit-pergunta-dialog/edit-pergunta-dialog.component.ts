import { DataService } from './../../services/data.service';
import { MinhasPerguntasComponent } from './../../components/minhas-perguntas/minhas-perguntas.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pergunta } from 'src/app/interfaces/pergunta';

@Component({
  selector: 'app-edit-pergunta-dialog',
  templateUrl: './edit-pergunta-dialog.component.html',
  styleUrls: ['./edit-pergunta-dialog.component.css']
})
export class EditPerguntaDialogComponent implements OnInit {
  ePergunta: Pergunta;
  cPergunta: Pergunta;
  materias = [
    {
      materia: 'por',
      formal: 'Língua Portuguesa',
      cor: '#698445',
    },
    {
      materia: 'mat',
      formal: 'Matemática',
      cor: '#AD8132',
    },
    { materia: 'cie', formal: 'Ciências', cor: '#294473', total: 0 },
    {
      materia: 'geo',
      formal: 'Geografia',
      cor: '#4F3A50',
    },
    { materia: 'his', formal: 'História', cor: '#9D8D6C', total: 0 },
    { materia: 'ing', formal: 'Inglês', cor: '#947FA6', total: 0 },
    {
      materia: 'edf',
      formal: 'Educação Física',
      cor: '#808BA6',
    },
    { materia: 'art', formal: 'Arte', cor: '#FFDFD2', total: 0 },
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pergunta, public dref: MatDialogRef<MinhasPerguntasComponent>) {
    this.ePergunta = data;
    this.cPergunta = data;
    dref.disableClose = true;
   }

  ngOnInit(): void {
  }

  setMateria(materia: string): void {
    let i = 0;
    this.materias.forEach(m => {
      if (m.materia === materia) {
        this.ePergunta.materia.cor = m.cor;
        this.ePergunta.materia.formal = m.formal;
        this.ePergunta.materia.materia = materia;
      }
      ++i;
    });
  }

  setCorrectAnswer(index: number): void {
    let i = 0;
    this.ePergunta.alternativas.forEach(a => {
      if (i === index) {
        a.resp = true;
      } else {
        a.resp = false;
      }
      ++i;
    });
  }

  removeAlternativa(index: number): void {
    this.ePergunta.alternativas.splice(index, 1);
  }

  addAlternativa(): void {
    this.ePergunta.alternativas.push({ alt: '', resp: false, selected: false });
  }

  verificarPergunta(): void {
    console.log(this.ePergunta);
  }

  save(): void {
    this.dref.close({ok: true, res: this.ePergunta});
  }

  cancel(): void {
    this.dref.close({ok: false, res: false});
  }

}
