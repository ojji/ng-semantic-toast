import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SuiToastModule, SuiToastService } from 'ng-semantic-toast';
import { BasicToastComponent } from './basic-toast/basic-toast.component';
import { TemplateToastComponent } from './template-toast/template-toast.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basic-toast', component: BasicToastComponent },
  { path: 'template-demo', component: TemplateToastComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BasicToastComponent,
    TemplateToastComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SuiToastModule
  ],
  providers: [SuiToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
