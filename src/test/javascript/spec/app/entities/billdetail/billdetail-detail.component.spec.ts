import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FoodAppTestModule } from '../../../test.module';
import { BilldetailDetailComponent } from 'app/entities/billdetail/billdetail-detail.component';
import { Billdetail } from 'app/shared/model/billdetail.model';

describe('Component Tests', () => {
  describe('Billdetail Management Detail Component', () => {
    let comp: BilldetailDetailComponent;
    let fixture: ComponentFixture<BilldetailDetailComponent>;
    const route = ({ data: of({ billdetail: new Billdetail(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FoodAppTestModule],
        declarations: [BilldetailDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BilldetailDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BilldetailDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load billdetail on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.billdetail).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
