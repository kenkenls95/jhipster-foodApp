import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FoodAppTestModule } from '../../../test.module';
import { CouponDetailComponent } from 'app/entities/coupon/coupon-detail.component';
import { Coupon } from 'app/shared/model/coupon.model';

describe('Component Tests', () => {
  describe('Coupon Management Detail Component', () => {
    let comp: CouponDetailComponent;
    let fixture: ComponentFixture<CouponDetailComponent>;
    const route = ({ data: of({ coupon: new Coupon(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FoodAppTestModule],
        declarations: [CouponDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CouponDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CouponDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load coupon on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.coupon).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
