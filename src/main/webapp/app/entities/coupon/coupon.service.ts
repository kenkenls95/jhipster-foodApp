import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICoupon } from 'app/shared/model/coupon.model';

type EntityResponseType = HttpResponse<ICoupon>;
type EntityArrayResponseType = HttpResponse<ICoupon[]>;

@Injectable({ providedIn: 'root' })
export class CouponService {
  public resourceUrl = SERVER_API_URL + 'api/coupons';

  constructor(protected http: HttpClient) {}

  create(coupon: ICoupon): Observable<EntityResponseType> {
    return this.http.post<ICoupon>(this.resourceUrl, coupon, { observe: 'response' });
  }

  update(coupon: ICoupon): Observable<EntityResponseType> {
    return this.http.put<ICoupon>(this.resourceUrl, coupon, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoupon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoupon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
