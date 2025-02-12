import { Injectable, signal, Signal, effect  } from '@angular/core';
import { Budget } from '../interfaces/budget';
import { BudgetSaved } from '../interfaces/budget-saved';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  seo = signal<boolean>(false);
  ads = signal<boolean>(false);
  web = signal<boolean>(false);
  pages = signal<number>(1);
  languages = signal<number>(1);
  panelExtraPrice = signal<number>(0);
  totalPrice = signal<number>(0);
  serviciosContratados = signal<Budget[]>([]);

  constructor() {
    effect(() => { // si inicias con url con seao, ads o web activados se añaden a servicciosContratdos
      const servicios: Budget[] = [];
      if (this.seo()) {
        servicios.push(this.budgets.find(b => b.title === 'SEO')!);
      }
      if (this.ads()) {
        servicios.push(this.budgets.find(b => b.title === 'Ads')!);
      }
      if (this.web()) {
        servicios.push(this.budgets.find(b => b.title === 'Web')!);
      }
      this.serviciosContratados.set(servicios);
    });
  }

  resetValues() {
    this.seo.set(false);
    this.ads.set(false);
    this.web.set(false);
    this.pages.set(1);
    this.languages.set(1);
  }

  setPages(value: number): void {
    this.pages.set(value); // Actualizar el valor del signal
  }

  setLanguages(value: number): void {
    this.languages.set(value); // Actualizar el valor del signal
  }

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


  private budgetsSavedList = signal<BudgetSaved[]>([ //listado inicial de ejemplo
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
      created_at: new Date('2024-01-28T16:00:00+01:00'),
      updated_at: new Date('2024-01-28T16:00:00+01:00')
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
invertido = signal<boolean>(false);


setOrderBy(order: 'fecha' | 'nombre' | 'total') {
  if (order === this.orderBy()) {
    this.invertido.set(!this.invertido()); // Invertir el estado de inversión
  }
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
  const isInverted = this.invertido(); // Leer el estado de inversión

  return this.budgetsSavedList()
    .slice()
    .filter(budget => budget.nombre.toLowerCase().includes(query.toLocaleLowerCase())) // Filtrar por búsqueda
    .sort((a, b) => {
      let result = 0;

      if (order === 'fecha') {
        result = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (order === 'nombre') {
        result = a.nombre.localeCompare(b.nombre);
      } else if (order === 'total') {
        result = b.total - a.total;
      }

      return isInverted ? result * -1 : result; // Invertir el orden si es necesario
    });
}


}

