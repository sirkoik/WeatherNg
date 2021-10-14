import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RefreshIndicatorService } from 'src/app/services/refresh-indicator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refresh-indicator',
  templateUrl: './refresh-indicator.component.html',
  styleUrls: ['./refresh-indicator.component.sass']
})
export class RefreshIndicatorComponent implements OnInit {
  // 300000
  indicatorValue = 0;

  constructor(public refreshIndicatorService: RefreshIndicatorService) {}

  ngOnInit(): void {
    //this.t0 = new Date().getTime();
  }
}
