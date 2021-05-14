import { Router } from '@angular/router';
import { User } from './../../interfaces/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as uuid from 'uuid';
import { Pergunta } from 'src/app/interfaces/pergunta';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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

  private user: User;

  constructor(public ds: DataService, private as: AuthService, private router: Router) {
    this.as.user$.subscribe((u: User) => {
      this.user = u;
    });
    if (!this.ds.cIndex) {
      this.ds.cIndex = 0;
    }
  }

  ngOnInit(): void {
    if (this.ds.tIndex === undefined) {
      this.router.navigate(['/create']);
    }
  }

  logTeste(): void {
    console.log(this.ds.testes[this.ds.tIndex]);
  }

  generatePergunta(mat: string): Pergunta {
    const nid = uuid.v4();
    return {
      _id: nid,
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

  addPerg(mat): void {
    if (this.ds.testes[this.ds.tIndex]) {
      this.ds.testes[this.ds.tIndex].perguntas.push(this.generatePergunta(mat));
      this.ds.testes[this.ds.tIndex].totalPerg = this.ds.testes[this.ds.tIndex].perguntas.length;
      this.ds.cIndex = this.ds.testes[this.ds.tIndex].perguntas.length - 1;
    }
  }

  removePerg(mat, indexPerg): void {
    if (this.ds.testes[this.ds.tIndex].perguntas.length > 1) {
      this.ds.testes[this.ds.tIndex].perguntas.splice(indexPerg, 1);
      this.ds.testes[this.ds.tIndex].totalPerg = this.ds.testes[this.ds.tIndex].perguntas.length;
      if (this.ds.cIndex === 0) {
        this.ds.cIndex = 0;
      } else {
        this.ds.cIndex --;
      }
    } else {
      this.ds.testes[this.ds.tIndex].perguntas.splice(indexPerg, 1);
      this.ds.testes[this.ds.tIndex].totalPerg = this.ds.testes[this.ds.tIndex].perguntas.length;
      this.ds.cIndex = 0;
    }
  }

  addAlternativa(indexPerg: number): void {
    this.ds.testes[this.ds.tIndex].perguntas[indexPerg].alternativas.push({ alt: '', resp: false, selected: false });
  }

  removeAlternativa(indexPerg: number, indexAlt: number): void {
    this.ds.testes[this.ds.tIndex].perguntas[indexPerg].alternativas.splice(indexAlt, 1);
  }

  selectTeste(id: number): void {
    this.ds.setTeste(id);
  }

  updateTest(): void {
    this.ds.testes[this.ds.tIndex].selected = false;
    this.ds.saveUpdateTeste(this.user.email, this.ds.testes[this.ds.tIndex], this.user.uid);
  }

  setMateria(materia: string, index: number): void {
    console.log(materia, index);
    this.materias.forEach(m => {
      if (m.materia === materia) {
        this.ds.testes[this.ds.tIndex].perguntas[index].materia.cor = m.cor;
        this.ds.testes[this.ds.tIndex].perguntas[index].materia.formal = m.formal;
      }
    });
  }

  prevPerg(): void {
    if (this.ds.cIndex > 0) {
      this.ds.cIndex --;
    }
  }

  nextPerg(): void {
    if (this.ds.cIndex < this.ds.testes[this.ds.tIndex].perguntas.length - 1) {
      this.ds.cIndex ++;
    }
  }

  setCorrectAnswer(index: number): void {
    let i = 0;
    this.ds.testes[this.ds.tIndex].perguntas[this.ds.cIndex].alternativas.forEach(a => {
      if (i === index) {
        a.resp = true;
      } else {
        a.resp = false;
      }
      ++i;
    });
  }

}
