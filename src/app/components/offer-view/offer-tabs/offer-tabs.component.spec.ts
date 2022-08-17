import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTabsComponent } from './offer-tabs.component';

describe('OfferTabsComponent', () => {
  let component: OfferTabsComponent;
  let fixture: ComponentFixture<OfferTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
