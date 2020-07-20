import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICoupon, Coupon } from 'app/shared/model/coupon.model';
import { CouponService } from './coupon.service';
import { CouponComponent } from './coupon.component';
import { CouponDetailComponent } from './coupon-detail.component';
import { CouponUpdateComponent } from './coupon-update.component';

@Injectable({ providedIn: 'root' })
export class CouponResolve implements Resolve<ICoupon> {
  constructor(private service: CouponService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICoupon> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((coupon: HttpResponse<Coupon>) => {
          if (coupon.body) {
            return of(coupon.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Coupon());
  }
}

export const couponRoute: Routes = [
  {
    path: '',
    component: CouponComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.coupon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CouponDetailComponent,
    resolve: {
      coupon: CouponResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.coupon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CouponUpdateComponent,
    resolve: {
      coupon: CouponResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.coupon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CouponUpdateComponent,
    resolve: {
      coupon: CouponResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'foodApp.coupon.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
