import { IFood } from 'app/shared/model/food.model';

export interface IBilldetail {
  id?: number;
  billdetailid?: number;
  foodid?: number;
  food?: IFood;
}

export class Billdetail implements IBilldetail {
  constructor(public id?: number, public billdetailid?: number, public foodid?: number, public food?: IFood) {}
}
