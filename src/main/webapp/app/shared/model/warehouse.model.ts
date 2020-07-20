import { Moment } from 'moment';
import { IFood } from 'app/shared/model/food.model';

export interface IWarehouse {
  id?: number;
  warehouseid?: number;
  foodid?: number;
  quantity?: number;
  date?: Moment;
  food?: IFood;
}

export class Warehouse implements IWarehouse {
  constructor(
    public id?: number,
    public warehouseid?: number,
    public foodid?: number,
    public quantity?: number,
    public date?: Moment,
    public food?: IFood
  ) {}
}
