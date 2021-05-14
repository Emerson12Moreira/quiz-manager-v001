import { TesteEntryInfo } from './../../interfaces/teste-entry-info';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent } from 'src/app/components/create/create.component';

@Component({
  selector: 'app-addtestedialog',
  templateUrl: './addtestedialog.component.html',
  styleUrls: ['./addtestedialog.component.css']
})
export class AddtestedialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TesteEntryInfo, public dref: MatDialogRef<CreateComponent>) {

   }

  ngOnInit(): void {
  }

  save(): void {
    this.dref.close({ok: true, r: this.data});
  }

  cancel(): void {
    this.dref.close({ok: false});
  }
}
