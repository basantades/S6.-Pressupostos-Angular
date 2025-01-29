import { Component, inject, effect } from '@angular/core';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { BudgetComponent } from "./components/budget/budget.component";
import { BudgetSaveComponent } from "./components/budget-save/budget-save.component";
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { BudgetService } from './services/budget.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [WelcomeComponent, BudgetComponent, BudgetSaveComponent, BudgetsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aconsegueix la millor qualitat';

    budgetService = inject(BudgetService);
    // route = inject(ActivatedRoute);
    // router = inject(Router);
  
    seo = this.budgetService.seo;
    ads = this.budgetService.ads;
    web = this.budgetService.web;
    pages = this.budgetService.pages;
    languages = this.budgetService.languages;
  
    // constructor() {
    //   // Leer valores desde la URL al iniciar la app
    //   this.route.queryParams.subscribe(params => {
    //     this.seo.set(params['seo'] === 'true');
    //     this.ads.set(params['ads'] === 'true');
    //     this.web.set(params['web'] === 'true');
    //     this.pages.set(Number(params['pages']) || 1);
    //     this.languages.set(Number(params['languages']) || 1);
    //   });
  
    //   // Actualizar la URL cuando cambien las señales
    //   effect(() => {
    //     this.updateUrl();
    //   });
    // }
  
    // updateUrl() {
    //   const queryParams = {
    //     seo: this.seo(),
    //     ads: this.ads(),
    //     web: this.web(),
    //     pages: this.pages(),
    //     languages: this.languages()
    //   };
  
    //   this.router.navigate([], {
    //     queryParams,
    //     queryParamsHandling: 'merge' // Mantener otros parámetros en la URL
    //   });
    // }
}
