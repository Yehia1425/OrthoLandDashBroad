import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOffer } from './delete-offer';

describe('DeleteOffer', () => {
  let component: DeleteOffer;
  let fixture: ComponentFixture<DeleteOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOffer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
