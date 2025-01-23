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

  it('should initialize the form with default values', () => {
    const formValue = component.panelForm.value;
    expect(formValue).toEqual({ countPages: 1, countLanguages: 1 });
  });


// ------------  incremento y decremento correctos -------------------------
  it('should increment countPages when increment is called with "pages"', () => {
    component.increment('pages');
    expect(component.panelForm.get('countPages')?.value).toBe(2);
  });
  
  it('should decrement countPages when decrement is called with "pages"', () => {
    component.increment('pages'); // Increment first to avoid negative values
    component.decrement('pages');
    expect(component.panelForm.get('countPages')?.value).toBe(1);
  });
  
  it('should increment countLanguages when increment is called with "languages"', () => {
    component.increment('languages');
    expect(component.panelForm.get('countLanguages')?.value).toBe(2);
  });
  
  it('should decrement countLanguages when decrement is called with "languages"', () => {
    component.increment('languages'); // Increment first to avoid negative values
    component.decrement('languages');
    expect(component.panelForm.get('countLanguages')?.value).toBe(1);
  });

// -------------------  evitar valores negativos  -----------------------------
  it('should not decrement countPages below 1', () => {
    component.decrement('pages');
    expect(component.panelForm.get('countPages')?.value).toBe(1);
  });
  
  it('should not decrement countLanguages below 1', () => {
    component.decrement('languages');
    expect(component.panelForm.get('countLanguages')?.value).toBe(1);
  });

// -------------------  calculo de precio  -----------------------------

  it('should calculate extra price correctly', () => {
    component.panelForm.setValue({ countPages: 2, countLanguages: 3 });
    component.calculateExtraPrice();
    expect(component.panelExtraPrice()).toBe(150); // (2 * 3 * 30) - 30
  });
  

  
});
