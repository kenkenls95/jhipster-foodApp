import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBilldetail } from 'app/shared/model/billdetail.model';

@Component({
  selector: 'jhi-billdetail-detail',
  templateUrl: './billdetail-detail.component.html',
})
export class BilldetailDetailComponent implements OnInit {
  billdetail: IBilldetail | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ billdetail }) => (this.billdetail = billdetail));
  }

  previousState(): void {
    window.history.back();
  }
}
