import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICoupon, Coupon } from 'app/shared/model/coupon.model';
import { CouponService } from './coupon.service';
import { IBill } from 'app/shared/model/bill.model';
import { BillService } from 'app/entities/bill/bill.service';

@Component({
  selector: 'jhi-coupon-update',
  templateUrl: './coupon-update.component.html',
})
export class CouponUpdateComponent implements OnInit {
  isSaving = false;
  bills: IBill[] = [];

  editForm = this.fb.group({
    id: [],
    couponid: [],
    couponname: [],
    coupon: [],
    type: [],
    bill: [],
  });

  constructor(
    protected couponService: CouponService,
    protected billService: BillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coupon }) => {
      this.updateForm(coupon);

      this.billService
        .query({ filter: 'coupon-is-null' })
        .pipe(
          map((res: HttpResponse<IBill[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBill[]) => {
          if (!coupon.bill || !coupon.bill.id) {
            this.bills = resBody;
          } else {
            this.billService
              .find(coupon.bill.id)
              .pipe(
                map((subRes: HttpResponse<IBill>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBill[]) => (this.bills = concatRes));
          }
        });
    });
  }

  updateForm(coupon: ICoupon): void {
    this.editForm.patchValue({
      id: coupon.id,
      couponid: coupon.couponid,
      couponname: coupon.couponname,
      coupon: coupon.coupon,
      type: coupon.type,
      bill: coupon.bill,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coupon = this.createFromForm();
    if (coupon.id !== undefined) {
      this.subscribeToSaveResponse(this.couponService.update(coupon));
    } else {
      this.subscribeToSaveResponse(this.couponService.create(coupon));
    }
  }

  private createFromForm(): ICoupon {
    return {
      ...new Coupon(),
      id: this.editForm.get(['id'])!.value,
      couponid: this.editForm.get(['couponid'])!.value,
      couponname: this.editForm.get(['couponname'])!.value,
      coupon: this.editForm.get(['coupon'])!.value,
      type: this.editForm.get(['type'])!.value,
      bill: this.editForm.get(['bill'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoupon>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBill): any {
    return item.id;
  }
}
