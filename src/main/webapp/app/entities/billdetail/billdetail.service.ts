import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBilldetail } from 'app/shared/model/billdetail.model';

type EntityResponseType = HttpResponse<IBilldetail>;
type EntityArrayResponseType = HttpResponse<IBilldetail[]>;

@Injectable({ providedIn: 'root' })
export class BilldetailService {
  public resourceUrl = SERVER_API_URL + 'api/billdetails';

  constructor(protected http: HttpClient) {}

  create(billdetail: IBilldetail): Observable<EntityResponseType> {
    return this.http.post<IBilldetail>(this.resourceUrl, billdetail, { observe: 'response' });
  }

  update(billdetail: IBilldetail): Observable<EntityResponseType> {
    return this.http.put<IBilldetail>(this.resourceUrl, billdetail, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBilldetail>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBilldetail[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
