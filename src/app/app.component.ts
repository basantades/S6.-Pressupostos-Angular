import { Component, inject, effect, runInInjectionContext, Injector  } from '@angular/core';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { BudgetComponent } from "./components/budget/budget.component";
import { BudgetSaveComponent } from "./components/budget-save/budget-save.component";
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { BudgetService } from './services/budget.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [WelcomeComponent, BudgetComponent, BudgetSaveComponent, BudgetsListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aconsegueix la millor qualitat';

    budgetService = inject(BudgetService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    injector = inject(Injector);

    initialSeo = false;
    initialAds = false;
    initialWeb = false;
    initialPages = 1;
    initialLanguages = 1;
  
    constructor() {

      // // Leer valores de la URL AL INICIAR la app ANTES de que Angular haga cambios
      this.route.queryParams.subscribe(params => {
        // console.log("📌 URL Params detectados:", params);
  
        // Solo modificar las variables si existen en la URL
        if (params['seo'] !== undefined) this.budgetService.seo.set(params['seo'] === 'true');
        if (params['ads'] !== undefined) this.budgetService.ads.set(params['ads'] === 'true');
        if (params['web'] !== undefined) this.budgetService.web.set(params['web'] === 'true');
        if (params['pages'] !== undefined) this.budgetService.pages.set(Number(params['pages']));
        if (params['languages'] !== undefined) this.budgetService.languages.set(Number(params['languages']));

      });
  
      // ⚠️ Retrasar la actualización de la URL para evitar que sobrescriba los valores
      setTimeout(() => {
        runInInjectionContext(this.injector, () => {
          effect(() => {
            const seoChanged = this.budgetService.seo() !== this.initialSeo;
            const adsChanged = this.budgetService.ads() !== this.initialAds;
            const webChanged = this.budgetService.web() !== this.initialWeb;
            const pagesChanged = this.budgetService.pages() !== this.initialPages;
            const languagesChanged = this.budgetService.languages() !== this.initialLanguages;
  
            if (seoChanged || adsChanged || webChanged || pagesChanged || languagesChanged) {
              this.router.navigate([], {
                queryParams: {
                  seo: seoChanged ? this.budgetService.seo() : undefined,
                  ads: adsChanged ? this.budgetService.ads() : undefined,
                  web: webChanged ? this.budgetService.web() : undefined,
                  pages: pagesChanged ? this.budgetService.pages() : undefined,
                  languages: languagesChanged ? this.budgetService.languages() : undefined
                },
                queryParamsHandling: 'merge'
              });
            } 
            if ( !seoChanged && !adsChanged && !webChanged && !pagesChanged && !languagesChanged) this.resetUrlParams();

          }
        );
        });
      }, 400); 
    }

    resetUrlParams() {
      this.router.navigate([], {
        queryParams: {
          seo: undefined,
          ads: undefined,
          web: undefined,
          pages: undefined,
          languages: undefined
        },
        queryParamsHandling: 'merge'
      });
    }
}
