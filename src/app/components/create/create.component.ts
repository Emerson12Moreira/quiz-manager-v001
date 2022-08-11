import { ErrordialogComponent } from './../../dialogs/errordialog/errordialog.component';
import { TesteEntryInfo } from './../../interfaces/teste-entry-info';
import { AddtestedialogComponent } from './../../dialogs/addtestedialog/addtestedialog.component';
import { User } from './../../interfaces/user';
import { AuthService } from './../../services/auth.service';
import { Pergunta } from 'src/app/interfaces/pergunta';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as uuid from 'uuid';
import {Teste} from '../../interfaces/teste';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  private user: User = null;
  dump: string;
  teste: Teste = {
    id: '',
    owner: '',
    name: '',
    touched: false,
    selected: false,
    criado_em: '',
    orientacoes: '',
    descricao: '',
    observacao: '',
    totalPerg: 0,
    estimatedTime: 1800,
    totalQuiz: 1,
    userScore: null,
    userInfo: {
      nota: null,
      aluno: '',
      turma: '',
      tempo_gasto: 0,
      iniciada_em: 0,
      finalizada_em: 0,
    },
    perguntas: [],
  };

  constructor(
    public ds: DataService,
    private ls: AuthService,
    public addDialog: MatDialog,
    private router: Router
  ) {
    this.ls.user$.subscribe((u) => {
      this.user = u;
      if (!this.ds.testes) {
        this.getTestes();
        this.router.navigate(['/teste/56241-A'])
      }
    });
  }

  ngOnInit(): void {}

  createDataTest(): void {
    this.teste.id = uuid.v4();
    this.teste.name = this.teste.name.replace(/ /g, '_');
    this.teste.owner = this.user.uid;
    this.teste.criado_em = Date.now().toString();
    this.ds.tIndex = undefined;
    this.ds.saveUpdateTeste(this.user.email, this.teste, this.user.uid);
  }

  getTestes(): void {
    this.ds.getData(this.user.email);
  }

  mark(resp): void {
    console.log(resp);
  }

  setTeste(index: number): void {
    this.ds.cIndex = 0;
    if (this.ds.tIndex === index) {
      this.ds.tIndex = undefined;
      let i = 0;
      this.ds.testes.forEach((t) => {
        this.ds.testes[i].selected = false;
        i++;
      });
    } else {
      this.ds.tIndex = index;
      let i = 0;
      this.ds.testes.forEach((t) => {
        if (i === index) {
          this.ds.testes[i].selected = true;
        } else {
          this.ds.testes[i].selected = false;
        }
        i++;
      });
      this.dump = JSON.stringify(this.ds.testes[index]);
    }
  }

  deleteTeste(name: string): void {
    this.ds.deleteTeste(this.user.email, name);
  }

  parseDate(date: string): Date {
    return new Date(parseInt(date, 10));
  }

  addTeste(): void {
    const d: TesteEntryInfo = {
      name: '',
      descricao: '',
      observacao: '',
    };
    const dref = this.addDialog.open(AddtestedialogComponent, {
      data: {
        name: d.name,
        descricao: d.descricao,
        observacao: d.observacao,
      },
    });
    dref.afterClosed().subscribe((res) => {
      if (res.ok) {
        const tInfo: TesteEntryInfo = res.r;
        if (tInfo.name) {
          this.teste.id = uuid.v4();
          this.teste.owner = this.user.uid;
          this.teste.criado_em = Date.now().toString();
          this.teste.name = tInfo.name.replace(/ /g, '_');
          this.teste.descricao = tInfo.descricao;
          this.teste.observacao = tInfo.observacao;
          this.ds.tIndex = undefined;
          this.ds.saveUpdateTeste(this.user.email, this.teste, this.user.uid);
        } else {
          this.addDialog.open(ErrordialogComponent, {
            data: {
              error: 0,
            },
          });
        }
      }
    });
  }
}
