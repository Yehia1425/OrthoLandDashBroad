import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSp } from './categories-sp';

describe('CategoriesSp', () => {
  let component: CategoriesSp;
  let fixture: ComponentFixture<CategoriesSp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
