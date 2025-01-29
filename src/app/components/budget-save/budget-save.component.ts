import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetSaved, ApiResult } from '../../interfaces/budget-saved';



@Component({
  selector: 'app-budget-save',
  imports: [ReactiveFormsModule],
  templateUrl: './budget-save.component.html',
  styleUrl: './budget-save.component.scss'
})
export class BudgetSaveComponent {

budgetService = inject(BudgetService);

pages = inject(BudgetService).pages;
languages = inject(BudgetService).languages;
panelExtraPrice = inject(BudgetService).panelExtraPrice
serviciosContratados = inject(BudgetService).serviciosContratados
totalPrice = inject(BudgetService).totalPrice

budgetsSavedList = inject(BudgetService).getBudgetsSavedList();


budgetSaveForm: FormGroup;


constructor(private fb: FormBuilder) {
this.budgetSaveForm = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
  email: ['', [Validators.required, Validators.email]],
  telefono: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(15)]],
});
}


onSubmit() {
  if (this.budgetSaveForm.invalid) {
    this.budgetSaveForm.markAllAsTouched();
    console.log(this.budgetSaveForm)
    return;
  }
  

  // Crea un nuevo objeto con los datos del formulario y servicios contratados
  const nuevoPresupuesto: BudgetSaved = {
    ...this.budgetSaveForm.value,
    servicios: this.serviciosContratados(),
    pages: this.pages(),
    languages: this.languages(),
    total: this.totalPrice(),
    created_at: new Date(),
    updated_at: new Date(),
  };


// Añade el nuevo presupuesto usando el servicio
this.budgetService.addBudget(nuevoPresupuesto);

// Limpia el formulario después de enviarlo
  this.budgetSaveForm.reset();

  this.showConfirmationModal()
}

  // Mostrar el modal
  showConfirmationModal() {
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      // Usar la clase Modal de Bootstrap
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

}
