import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

// ------------  test personalizados: -------------------------

it('should have the default form values', () => {
  expect(component.panelForm.value).toEqual({ countPages: 1, countLanguages: 1 });
});

it('should validate pages correctly', () => {
  component.panelForm.get('countPages')?.setValue(NaN);
  component.checkPages();
  expect(component.panelForm.get('countPages')?.value).toBe(1);

  component.panelForm.get('countPages')?.setValue(0);
  component.checkPages();
  expect(component.panelForm.get('countPages')?.value).toBe(1);

  component.panelForm.get('countPages')?.setValue(2);
  component.checkPages();
  expect(component.panelForm.get('countPages')?.value).toBe(2);
});

it('should validate languages correctly', () => {
  component.panelForm.get('countLanguages')?.setValue(NaN);
  component.checkLanguages();
  expect(component.panelForm.get('countLanguages')?.value).toBe(1);

  component.panelForm.get('countLanguages')?.setValue(0);
  component.checkLanguages();
  expect(component.panelForm.get('countLanguages')?.value).toBe(1);

  component.panelForm.get('countLanguages')?.setValue(2);
  component.checkLanguages();
  expect(component.panelForm.get('countLanguages')?.value).toBe(2);
});

it('should increment pages', () => {
  component.panelForm.get('countPages')?.setValue(1);
  component.increment('pages');
  expect(component.panelForm.get('countPages')?.value).toBe(2);
});

it('should increment languages', () => {
  component.panelForm.get('countLanguages')?.setValue(1);
  component.increment('languages');
  expect(component.panelForm.get('countLanguages')?.value).toBe(2);
});

it('should decrement pages', () => {
  component.panelForm.get('countPages')?.setValue(2);
  component.decrement('pages');
  expect(component.panelForm.get('countPages')?.value).toBe(1);
});

it('should decrement languages', () => {
  component.panelForm.get('countLanguages')?.setValue(2);
  component.decrement('languages');
  expect(component.panelForm.get('countLanguages')?.value).toBe(1);
});

  
});
