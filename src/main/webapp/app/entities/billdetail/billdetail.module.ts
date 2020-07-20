import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppSharedModule } from 'app/shared/shared.module';
import { BilldetailComponent } from './billdetail.component';
import { BilldetailDetailComponent } from './billdetail-detail.component';
import { BilldetailUpdateComponent } from './billdetail-update.component';
import { BilldetailDeleteDialogComponent } from './billdetail-delete-dialog.component';
import { billdetailRoute } from './billdetail.route';

@NgModule({
  imports: [FoodAppSharedModule, RouterModule.forChild(billdetailRoute)],
  declarations: [BilldetailComponent, BilldetailDetailComponent, BilldetailUpdateComponent, BilldetailDeleteDialogComponent],
  entryComponents: [BilldetailDeleteDialogComponent],
})
export class FoodAppBilldetailModule {}
