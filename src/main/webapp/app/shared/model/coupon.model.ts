import { IBill } from 'app/shared/model/bill.model';

export interface ICoupon {
  id?: number;
  couponid?: number;
  couponname?: string;
  coupon?: number;
  type?: string;
  bill?: IBill;
}

export class Coupon implements ICoupon {
  constructor(
    public id?: number,
    public couponid?: number,
    public couponname?: string,
    public coupon?: number,
    public type?: string,
    public bill?: IBill
  ) {}
}
