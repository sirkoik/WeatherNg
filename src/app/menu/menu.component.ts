import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output() showCreditsEvent = new EventEmitter<boolean>();

  showTheCredits = false;

  constructor() {}

  ngOnInit(): void {}

  showCredits(): void {
    this.showTheCredits = !this.showTheCredits;
    this.showCreditsEvent.emit(this.showTheCredits);
  }
}
