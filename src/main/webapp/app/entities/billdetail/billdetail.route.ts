import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBilldetail, Billdetail } from 'app/shared/model/billdetail.model';
import { BilldetailService } from './billdetail.service';
import { BilldetailComponent } from './billdetail.component';
import { BilldetailDetailComponent } from './billdetail-detail.component';
import { BilldetailUpdateComponent } from './billdetail-update.component';

@Injectable({ providedIn: 'root' })
export class BilldetailResolve implements Resolve<IBilldetail> {
  constructor(private service: BilldetailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBilldetail> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((billdetail: HttpResponse<Billdetail>) => {
          if (billdetail.body) {
            return of(billdetail.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Billdetail());
  }
}

export const billdetailRoute: Routes = [
  {
    path: '',
    component: BilldetailComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.billdetail.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BilldetailDetailComponent,
    resolve: {
      billdetail: BilldetailResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.billdetail.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BilldetailUpdateComponent,
    resolve: {
      billdetail: BilldetailResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.billdetail.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BilldetailUpdateComponent,
    resolve: {
      billdetail: BilldetailResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.billdetail.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
