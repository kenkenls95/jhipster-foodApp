import { Moment } from 'moment';
import { ICoupon } from 'app/shared/model/coupon.model';

export interface IBill {
  id?: number;
  billid?: number;
  date?: Moment;
  totalprice?: number;
  couponid?: number;
  shipping?: boolean;
  coupon?: ICoupon;
}

export class Bill implements IBill {
  constructor(
    public id?: number,
    public billid?: number,
    public date?: Moment,
    public totalprice?: number,
    public couponid?: number,
    public shipping?: boolean,
    public coupon?: ICoupon
  ) {
    this.shipping = this.shipping || false;
  }
}
