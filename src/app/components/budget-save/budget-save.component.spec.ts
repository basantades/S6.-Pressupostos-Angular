import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSaveComponent } from './budget-save.component';

describe('BudgetSaveComponent', () => {
  let component: BudgetSaveComponent;
  let fixture: ComponentFixture<BudgetSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
