import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshIndicatorService {
  t0 = 0;
  t1 = 0;
  indicatorValue = 0;
  indicatorRefresh = 100;
  refreshIndicatorSubscription!: Subscription;

  refreshIndicator: Observable<any> = timer(0, this.indicatorRefresh).pipe(
    switchMap(
      () =>
        new Observable(obs => {
          this.t1 = new Date().getTime();

          if (this.t1 - this.t0 < environment.refreshInterval) {
            // code while progressing here
          } else {
            this.t0 = new Date().getTime();
          }

          this.indicatorValue =
            (100 * (this.t1 - this.t0)) / environment.refreshInterval;
        })
    )
  );

  subscribeToRefresh() {
    this.t0 = new Date().getTime();
    this.refreshIndicatorSubscription = this.refreshIndicator.subscribe();
  }

  unsubscribeFromRefresh() {
    this.refreshIndicatorSubscription.unsubscribe();
  }

  constructor() {}
}
