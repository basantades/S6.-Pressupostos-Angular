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
      total: 700,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id_budgetSaved: 2,
      nombre: "Carlos Costa",
      email: "carlos@costa",
      servicios: [
        { id: 3, title: "Web", descripcion: "Programació d'una web responsive completa.", price: 500 }],      
      pages: 5,
      languages: 3,
      total: 920,
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

searchQuery = signal<string>(''); 
orderBy = signal<'fecha' | 'nombre' | 'total'>('fecha'); // Criterio de orden inicial


setOrderBy(order: 'fecha' | 'nombre' | 'total') {
  this.orderBy.set(order); // Cambiar el criterio de orden
}

searchBudgets(event: Event) {
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
    this.searchQuery.update(value => newValue || "");
    console.log(this.searchQuery())
}

getSortedBudgets(): BudgetSaved[] {
  const order = this.orderBy(); // Obtener el criterio de orden
  const query = this.searchQuery();

  return this.budgetsSavedList()
    .slice()
    .filter(budget => budget.nombre.toLowerCase().includes(query.toLocaleLowerCase())) //filtrar por busqueda
    .sort((a, b) => {
      if (order === 'fecha') {
        // Ordenar por fecha (más reciente a más antigua)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (order === 'nombre') {
        // Ordenar por nombre (alfabético)
        return a.nombre.localeCompare(b.nombre);
      } else if (order === 'total') {
        // Ordenar por total (de mayor a menor)
        return b.total - a.total;
      }

      return 0;
    });
}

  constructor() { }
}

