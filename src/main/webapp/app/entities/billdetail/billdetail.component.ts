import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBilldetail } from 'app/shared/model/billdetail.model';
import { BilldetailService } from './billdetail.service';
import { BilldetailDeleteDialogComponent } from './billdetail-delete-dialog.component';

@Component({
  selector: 'jhi-billdetail',
  templateUrl: './billdetail.component.html',
})
export class BilldetailComponent implements OnInit, OnDestroy {
  billdetails?: IBilldetail[];
  eventSubscriber?: Subscription;

  constructor(protected billdetailService: BilldetailService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.billdetailService.query().subscribe((res: HttpResponse<IBilldetail[]>) => (this.billdetails = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBilldetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBilldetail): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBilldetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('billdetailListModification', () => this.loadAll());
  }

  delete(billdetail: IBilldetail): void {
    const modalRef = this.modalService.open(BilldetailDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.billdetail = billdetail;
  }
}
