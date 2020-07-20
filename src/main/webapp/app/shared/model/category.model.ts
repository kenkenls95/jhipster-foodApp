import { IFood } from 'app/shared/model/food.model';

export interface ICategory {
  id?: number;
  categoryid?: number;
  categoryname?: string;
  foods?: IFood[];
}

export class Category implements ICategory {
  constructor(public id?: number, public categoryid?: number, public categoryname?: string, public foods?: IFood[]) {}
}
