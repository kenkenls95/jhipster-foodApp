import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [FoodAppSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class FoodAppHomeModule {}
