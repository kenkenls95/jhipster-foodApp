import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoupon } from 'app/shared/model/coupon.model';
import { CouponService } from './coupon.service';

@Component({
  templateUrl: './coupon-delete-dialog.component.html',
})
export class CouponDeleteDialogComponent {
  coupon?: ICoupon;

  constructor(protected couponService: CouponService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.couponService.delete(id).subscribe(() => {
      this.eventManager.broadcast('couponListModification');
      this.activeModal.close();
    });
  }
}
