import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategories } from './delete-categories';

describe('DeleteCategories', () => {
  let component: DeleteCategories;
  let fixture: ComponentFixture<DeleteCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
