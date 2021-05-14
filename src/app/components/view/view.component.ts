import { Router } from '@angular/router';
import { ShuffleService } from './../../services/shuffle.service';
import { Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

declare const $: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit, AfterViewInit {
  imgs: ElementRef;

  constructor(public ds: DataService, public ss: ShuffleService, private router: Router) { }

  ngOnInit(): void {
    if (this.ds.tIndex === undefined) {
      this.router.navigate(['/create']);
    }
  }

  ngAfterViewInit(): void {
    $('.fancy').fancybox();
  }

  convAlternativas(pos: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvxwyz';
    return `(${alphabet[pos].toUpperCase()}) `;
  }
}
