import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class ReportService {

  getStatistics():Observable<any>{

    return of({

      totalSales:120,
      approved:90,
      failed:30

    });

  }

}
