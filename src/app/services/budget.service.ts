import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

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
      price: 500
    }
  ]

  getBudgets(): Budget[] {
    return this.budgets;
  }

  constructor() { }
}
