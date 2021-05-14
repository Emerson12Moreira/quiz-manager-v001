import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {

  msgs = {
    0: {
      header: 'Erro de inserção',
      class: 'error',
      message: 'O campo NOME deve ser preenchido. Não foi possível criar um novo Teste.'
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {   }

  ngOnInit(): void {
  }

}
