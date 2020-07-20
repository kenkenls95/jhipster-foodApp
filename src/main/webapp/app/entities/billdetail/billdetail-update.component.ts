import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBilldetail, Billdetail } from 'app/shared/model/billdetail.model';
import { BilldetailService } from './billdetail.service';

@Component({
  selector: 'jhi-billdetail-update',
  templateUrl: './billdetail-update.component.html',
})
export class BilldetailUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    billdetailid: [],
    foodid: [],
  });

  constructor(protected billdetailService: BilldetailService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ billdetail }) => {
      this.updateForm(billdetail);
    });
  }

  updateForm(billdetail: IBilldetail): void {
    this.editForm.patchValue({
      id: billdetail.id,
      billdetailid: billdetail.billdetailid,
      foodid: billdetail.foodid,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const billdetail = this.createFromForm();
    if (billdetail.id !== undefined) {
      this.subscribeToSaveResponse(this.billdetailService.update(billdetail));
    } else {
      this.subscribeToSaveResponse(this.billdetailService.create(billdetail));
    }
  }

  private createFromForm(): IBilldetail {
    return {
      ...new Billdetail(),
      id: this.editForm.get(['id'])!.value,
      billdetailid: this.editForm.get(['billdetailid'])!.value,
      foodid: this.editForm.get(['foodid'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBilldetail>>): void {
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
}
