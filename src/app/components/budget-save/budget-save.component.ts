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
precioServicios: number = 0;


budgetsSavedList = inject(BudgetService).getBudgetsSavedList();


budgetSaveForm: FormGroup;


constructor(private fb: FormBuilder) {
this.budgetSaveForm = this.fb.group({
  nombre: ['Ismael', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
  email: ['ismae@ismael.com', [Validators.required, Validators.email]],
  telefono: ['685457489', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(15)]],
});
}


onSubmit() {
  if (this.budgetSaveForm.invalid) {
    this.budgetSaveForm.markAllAsTouched();
    return;
  }

  // Crea un nuevo objeto con los datos del formulario y servicios contratados
  const nuevoPresupuesto: BudgetSaved = {
    ...this.budgetSaveForm.value,
    servicios: this.serviciosContratados(),
    pages: this.pages(),
    languages: this.languages(),
    total: this.calcularTotal(),
    created_at: new Date(),
    updated_at: new Date(),
  };


// Añade el nuevo presupuesto usando el servicio
this.budgetService.addBudget(nuevoPresupuesto);



  // Limpia el formulario después de enviarlo
  this.budgetSaveForm.reset();
}

calcularTotal(): number {
  this.precioServicios = this.serviciosContratados().reduce((total, budget) => total + budget.price, 0);

  return this.precioServicios;
}

}
