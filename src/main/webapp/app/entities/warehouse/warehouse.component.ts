import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from './warehouse.service';
import { WarehouseDeleteDialogComponent } from './warehouse-delete-dialog.component';

@Component({
  selector: 'jhi-warehouse',
  templateUrl: './warehouse.component.html',
})
export class WarehouseComponent implements OnInit, OnDestroy {
  warehouses?: IWarehouse[];
  eventSubscriber?: Subscription;

  constructor(protected warehouseService: WarehouseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.warehouseService.query().subscribe((res: HttpResponse<IWarehouse[]>) => (this.warehouses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWarehouses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWarehouse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWarehouses(): void {
    this.eventSubscriber = this.eventManager.subscribe('warehouseListModification', () => this.loadAll());
  }

  delete(warehouse: IWarehouse): void {
    const modalRef = this.modalService.open(WarehouseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.warehouse = warehouse;
  }
}
