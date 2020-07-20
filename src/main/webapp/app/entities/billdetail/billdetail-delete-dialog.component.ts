import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBilldetail } from 'app/shared/model/billdetail.model';
import { BilldetailService } from './billdetail.service';

@Component({
  templateUrl: './billdetail-delete-dialog.component.html',
})
export class BilldetailDeleteDialogComponent {
  billdetail?: IBilldetail;

  constructor(
    protected billdetailService: BilldetailService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.billdetailService.delete(id).subscribe(() => {
      this.eventManager.broadcast('billdetailListModification');
      this.activeModal.close();
    });
  }
}
