import { Injectable, signal, Signal } from '@angular/core';
import { Budget } from '../interfaces/budget';
import { BudgetSaved } from '../interfaces/budget-saved';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  pages = signal<number>(1);
  languages = signal<number>(1);
  panelExtraPrice = signal<number>(0);
  serviciosContratados = signal<Budget[]>([]);


  budgets: Budget[] = [
    { 
      id: 1,
      title: "SEO", 
      descripcion: "Optimització per a motors de cerca per millorar la visibilitat en línia.",
      price: 300
    },
    { 
      id: 2,
      title: "Ads", 
      descripcion: "Creació i gestió de campanyes publicitàries per a augmentar el trànsit i les conversions.",
      price: 400
    },
    { 
      id: 3,
      title: "Web", 
      descripcion: "Programació d'una web responsive completa.",
      price: 500,
      additionalOptions: true
    }
  ]

  getBudgets(): Budget[] {
    return this.budgets;
  }


  private budgetsSavedList = signal<BudgetSaved[]>([
    {
      id_budgetSaved: 1,
      nombre: "Jordi",
      telefono: "123456789",
      email: "jordi@jordi",
      servicios: [
        { id: 1, title: "SEO", descripcion: "Optimització per a motors de cerca per millorar la visibilitat en línia.", price: 300 },
        { id: 2, title: "Ads", descripcion: "Creació i gestió de campanyes publicitàries per a augmentar el trànsit i les conversions.", price: 400 }],      
      total: 500,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id_budgetSaved: 2,
      nombre: "Jordi",
      email: "jordi@jordi",
      servicios: [
        { id: 3, title: "Web", descripcion: "Programació d'una web responsive completa.", price: 500 }],      
      pages: 1,
      languages: 1,
      total: 500,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  getBudgetsSavedList(): Signal<BudgetSaved[]> {
    return this.budgetsSavedList.asReadonly();
  }

addBudget(budget: BudgetSaved) {
  const currentBudgets = this.budgetsSavedList();
  this.budgetsSavedList.set([...currentBudgets, budget]);
}

  constructor() { }
}
