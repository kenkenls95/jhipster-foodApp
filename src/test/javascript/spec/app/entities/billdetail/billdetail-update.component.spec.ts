import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FoodAppTestModule } from '../../../test.module';
import { BilldetailUpdateComponent } from 'app/entities/billdetail/billdetail-update.component';
import { BilldetailService } from 'app/entities/billdetail/billdetail.service';
import { Billdetail } from 'app/shared/model/billdetail.model';

describe('Component Tests', () => {
  describe('Billdetail Management Update Component', () => {
    let comp: BilldetailUpdateComponent;
    let fixture: ComponentFixture<BilldetailUpdateComponent>;
    let service: BilldetailService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FoodAppTestModule],
        declarations: [BilldetailUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BilldetailUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BilldetailUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BilldetailService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Billdetail(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Billdetail();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
