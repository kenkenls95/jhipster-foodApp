import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFood, Food } from 'app/shared/model/food.model';
import { FoodService } from './food.service';
import { IBilldetail } from 'app/shared/model/billdetail.model';
import { BilldetailService } from 'app/entities/billdetail/billdetail.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';

type SelectableEntity = IBilldetail | ICategory;

@Component({
  selector: 'jhi-food-update',
  templateUrl: './food-update.component.html',
})
export class FoodUpdateComponent implements OnInit {
  isSaving = false;
  billdetails: IBilldetail[] = [];
  categories: ICategory[] = [];

  editForm = this.fb.group({
    id: [],
    foodid: [],
    categoryid: [],
    foodname: [],
    description: [],
    price: [],
    billdetail: [],
    categories: [],
  });

  constructor(
    protected foodService: FoodService,
    protected billdetailService: BilldetailService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ food }) => {
      this.updateForm(food);

      this.billdetailService
        .query({ filter: 'food-is-null' })
        .pipe(
          map((res: HttpResponse<IBilldetail[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBilldetail[]) => {
          if (!food.billdetail || !food.billdetail.id) {
            this.billdetails = resBody;
          } else {
            this.billdetailService
              .find(food.billdetail.id)
              .pipe(
                map((subRes: HttpResponse<IBilldetail>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBilldetail[]) => (this.billdetails = concatRes));
          }
        });

      this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));
    });
  }

  updateForm(food: IFood): void {
    this.editForm.patchValue({
      id: food.id,
      foodid: food.foodid,
      categoryid: food.categoryid,
      foodname: food.foodname,
      description: food.description,
      price: food.price,
      billdetail: food.billdetail,
      categories: food.categories,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const food = this.createFromForm();
    if (food.id !== undefined) {
      this.subscribeToSaveResponse(this.foodService.update(food));
    } else {
      this.subscribeToSaveResponse(this.foodService.create(food));
    }
  }

  private createFromForm(): IFood {
    return {
      ...new Food(),
      id: this.editForm.get(['id'])!.value,
      foodid: this.editForm.get(['foodid'])!.value,
      categoryid: this.editForm.get(['categoryid'])!.value,
      foodname: this.editForm.get(['foodname'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      billdetail: this.editForm.get(['billdetail'])!.value,
      categories: this.editForm.get(['categories'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFood>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ICategory[], option: ICategory): ICategory {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
