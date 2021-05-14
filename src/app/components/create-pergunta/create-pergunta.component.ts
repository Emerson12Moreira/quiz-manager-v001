import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Pergunta } from 'src/app/interfaces/pergunta';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-pergunta',
  templateUrl: './create-pergunta.component.html',
  styleUrls: ['./create-pergunta.component.css']
})
export class CreatePerguntaComponent implements OnInit {
  user: User;
  nPergunta: Pergunta = {
    _id: '',
    currentState: false,
    user_asw: '',
    touched: false,
    status: 0,
    texto: '',
    proposta: '',
    enunciado: '',
    peso: 0,
    elapsedTime: 0,
    viewed: false,
      totalTime: -1,
      info: '',
      correct: false,
      quiz: '',
      descritor: '',
    materia: {
      materia: '',
      formal: '',
      cor: '',
    },
    alternativas: [
      { alt: '', resp: false, selected: false },
      { alt: '', resp: false, selected: false },
      { alt: '', resp: false, selected: false },
      { alt: '', resp: false, selected: false },
    ],
  };
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

  changed = false;

  constructor(public ds: DataService, private as: AuthService, private router: Router) {
    this.as.user$.subscribe((u: User) => {
      this.user = u;
    });
   }

  ngOnInit(): void {
  }

  resetPergunta(): Pergunta {
    return {
      _id: '',
      currentState: false,
      user_asw: '',
      touched: false,
      status: 0,
      texto: '',
      proposta: '',
      enunciado: '',
      peso: 0,
      elapsedTime: 0,
      viewed: false,
      totalTime: -1,
      info: '',
      correct: false,
      quiz: '',
      descritor: '',
      materia: {
        materia: '',
        formal: '',
        cor: '',
      },
      alternativas: [
        { alt: '', resp: false, selected: false },
        { alt: '', resp: false, selected: false },
        { alt: '', resp: false, selected: false },
        { alt: '', resp: false, selected: false },
      ],
    };
  }

  setMateria(materia: string): void {
    let i = 0;
    this.materias.forEach(m => {
      if (m.materia === materia) {
        this.nPergunta.materia.cor = m.cor;
        this.nPergunta.materia.formal = m.formal;
        this.nPergunta.materia.materia = materia;
      }
      ++i;
    });
    this.nPergunta._id = uuid.v4();
  }

  setCorrectAnswer(index: number): void {
    let i = 0;
    this.nPergunta.alternativas.forEach(a => {
      if (i === index) {
        a.resp = true;
      } else {
        a.resp = false;
      }
      ++i;
    });
  }

  removeAlternativa(index: number): void {
    this.nPergunta.alternativas.splice(index, 1);
  }

  addAlternativa(): void {
    this.nPergunta.alternativas.push({ alt: '', resp: false, selected: false });
  }

  verificarPergunta(): void {
    console.log(this.nPergunta);
  }

  salvarPergunta(): void {
    this.ds.saveUpdatePergunta(this.user.email, this.nPergunta);
  }

}
