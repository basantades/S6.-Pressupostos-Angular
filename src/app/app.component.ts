import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { BudgetComponent } from "./components/budget/budget.component";
import { BudgetSaveComponent } from "./components/budget-save/budget-save.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeComponent, BudgetComponent, BudgetSaveComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aconsegueix la millor qualitat';
}
