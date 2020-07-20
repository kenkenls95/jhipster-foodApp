import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FoodAppTestModule } from '../../../test.module';
import { BilldetailComponent } from 'app/entities/billdetail/billdetail.component';
import { BilldetailService } from 'app/entities/billdetail/billdetail.service';
import { Billdetail } from 'app/shared/model/billdetail.model';

describe('Component Tests', () => {
  describe('Billdetail Management Component', () => {
    let comp: BilldetailComponent;
    let fixture: ComponentFixture<BilldetailComponent>;
    let service: BilldetailService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FoodAppTestModule],
        declarations: [BilldetailComponent],
      })
        .overrideTemplate(BilldetailComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BilldetailComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BilldetailService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Billdetail(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.billdetails && comp.billdetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
