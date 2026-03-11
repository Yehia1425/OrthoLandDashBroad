import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSp } from './product-sp';

describe('ProductSp', () => {
  let component: ProductSp;
  let fixture: ComponentFixture<ProductSp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
