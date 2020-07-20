import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'food',
        loadChildren: () => import('./food/food.module').then(m => m.FoodAppFoodModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.FoodAppCategoryModule),
      },
      {
        path: 'bill',
        loadChildren: () => import('./bill/bill.module').then(m => m.FoodAppBillModule),
      },
      {
        path: 'billdetail',
        loadChildren: () => import('./billdetail/billdetail.module').then(m => m.FoodAppBilldetailModule),
      },
      {
        path: 'coupon',
        loadChildren: () => import('./coupon/coupon.module').then(m => m.FoodAppCouponModule),
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then(m => m.FoodAppWarehouseModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class FoodAppEntityModule {}
