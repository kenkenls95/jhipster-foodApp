import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppSharedModule } from 'app/shared/shared.module';
import { CouponComponent } from './coupon.component';
import { CouponDetailComponent } from './coupon-detail.component';
import { CouponUpdateComponent } from './coupon-update.component';
import { CouponDeleteDialogComponent } from './coupon-delete-dialog.component';
import { couponRoute } from './coupon.route';

@NgModule({
  imports: [FoodAppSharedModule, RouterModule.forChild(couponRoute)],
  declarations: [CouponComponent, CouponDetailComponent, CouponUpdateComponent, CouponDeleteDialogComponent],
  entryComponents: [CouponDeleteDialogComponent],
})
export class FoodAppCouponModule {}
