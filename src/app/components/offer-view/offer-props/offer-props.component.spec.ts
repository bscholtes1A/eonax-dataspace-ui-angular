import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPropsComponent } from './offer-props.component';

describe('OfferPropsComponent', () => {
  let component: OfferPropsComponent;
  let fixture: ComponentFixture<OfferPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
