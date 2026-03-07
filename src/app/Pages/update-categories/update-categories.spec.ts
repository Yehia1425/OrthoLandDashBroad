import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategories } from './update-categories';

describe('UpdateCategories', () => {
  let component: UpdateCategories;
  let fixture: ComponentFixture<UpdateCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
