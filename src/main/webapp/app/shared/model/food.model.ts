import { IBilldetail } from 'app/shared/model/billdetail.model';
import { ICategory } from 'app/shared/model/category.model';
import { IWarehouse } from 'app/shared/model/warehouse.model';

export interface IFood {
  id?: number;
  foodid?: number;
  categoryid?: number;
  foodname?: string;
  description?: string;
  price?: number;
  billdetail?: IBilldetail;
  categories?: ICategory[];
  warehouse?: IWarehouse;
}

export class Food implements IFood {
  constructor(
    public id?: number,
    public foodid?: number,
    public categoryid?: number,
    public foodname?: string,
    public description?: string,
    public price?: number,
    public billdetail?: IBilldetail,
    public categories?: ICategory[],
    public warehouse?: IWarehouse
  ) {}
}
