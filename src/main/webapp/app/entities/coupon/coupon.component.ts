import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoupon } from 'app/shared/model/coupon.model';
import { CouponService } from './coupon.service';
import { CouponDeleteDialogComponent } from './coupon-delete-dialog.component';

@Component({
  selector: 'jhi-coupon',
  templateUrl: './coupon.component.html',
})
export class CouponComponent implements OnInit, OnDestroy {
  coupons?: ICoupon[];
  eventSubscriber?: Subscription;

  constructor(protected couponService: CouponService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.couponService.query().subscribe((res: HttpResponse<ICoupon[]>) => (this.coupons = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCoupons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICoupon): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCoupons(): void {
    this.eventSubscriber = this.eventManager.subscribe('couponListModification', () => this.loadAll());
  }

  delete(coupon: ICoupon): void {
    const modalRef = this.modalService.open(CouponDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coupon = coupon;
  }
}
