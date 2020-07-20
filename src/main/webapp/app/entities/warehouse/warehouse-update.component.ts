import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWarehouse, Warehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from './warehouse.service';
import { IFood } from 'app/shared/model/food.model';
import { FoodService } from 'app/entities/food/food.service';

@Component({
  selector: 'jhi-warehouse-update',
  templateUrl: './warehouse-update.component.html',
})
export class WarehouseUpdateComponent implements OnInit {
  isSaving = false;
  foods: IFood[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    warehouseid: [],
    foodid: [],
    quantity: [],
    date: [],
    food: [],
  });

  constructor(
    protected warehouseService: WarehouseService,
    protected foodService: FoodService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ warehouse }) => {
      this.updateForm(warehouse);

      this.foodService
        .query({ filter: 'warehouse-is-null' })
        .pipe(
          map((res: HttpResponse<IFood[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFood[]) => {
          if (!warehouse.food || !warehouse.food.id) {
            this.foods = resBody;
          } else {
            this.foodService
              .find(warehouse.food.id)
              .pipe(
                map((subRes: HttpResponse<IFood>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFood[]) => (this.foods = concatRes));
          }
        });
    });
  }

  updateForm(warehouse: IWarehouse): void {
    this.editForm.patchValue({
      id: warehouse.id,
      warehouseid: warehouse.warehouseid,
      foodid: warehouse.foodid,
      quantity: warehouse.quantity,
      date: warehouse.date,
      food: warehouse.food,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const warehouse = this.createFromForm();
    if (warehouse.id !== undefined) {
      this.subscribeToSaveResponse(this.warehouseService.update(warehouse));
    } else {
      this.subscribeToSaveResponse(this.warehouseService.create(warehouse));
    }
  }

  private createFromForm(): IWarehouse {
    return {
      ...new Warehouse(),
      id: this.editForm.get(['id'])!.value,
      warehouseid: this.editForm.get(['warehouseid'])!.value,
      foodid: this.editForm.get(['foodid'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      date: this.editForm.get(['date'])!.value,
      food: this.editForm.get(['food'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouse>>): void {
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

  trackById(index: number, item: IFood): any {
    return item.id;
  }
}
