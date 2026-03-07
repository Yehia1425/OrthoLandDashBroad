import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOffer } from './update-offer';

describe('UpdateOffer', () => {
  let component: UpdateOffer;
  let fixture: ComponentFixture<UpdateOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOffer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
