import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWarehouse } from 'app/shared/model/warehouse.model';

type EntityResponseType = HttpResponse<IWarehouse>;
type EntityArrayResponseType = HttpResponse<IWarehouse[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  public resourceUrl = SERVER_API_URL + 'api/warehouses';

  constructor(protected http: HttpClient) {}

  create(warehouse: IWarehouse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouse);
    return this.http
      .post<IWarehouse>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(warehouse: IWarehouse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouse);
    return this.http
      .put<IWarehouse>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWarehouse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWarehouse[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(warehouse: IWarehouse): IWarehouse {
    const copy: IWarehouse = Object.assign({}, warehouse, {
      date: warehouse.date && warehouse.date.isValid() ? warehouse.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((warehouse: IWarehouse) => {
        warehouse.date = warehouse.date ? moment(warehouse.date) : undefined;
      });
    }
    return res;
  }
}
