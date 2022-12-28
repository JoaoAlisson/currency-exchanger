import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { HeaderComponent } from './template-components/header/header.component';
import { FooterComponent } from './template-components/footer/footer.component';
import { ConvertPanelComponent } from './components/convert-panel/convert-panel.component';
import { HistoricalRatesChartComponent } from './components/historical-rates-chart/historical-rates-chart.component';
import { PopularCurrenciesGridComponent } from './components/popular-currencies-grid/popular-currencies-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingDirective } from './directives/loading.directive';
import { LoadingComponent } from './template-components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    HeaderComponent,
    FooterComponent,
    ConvertPanelComponent,
    HistoricalRatesChartComponent,
    PopularCurrenciesGridComponent,
    LoadingDirective,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
