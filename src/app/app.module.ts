import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list.component';
import { SettingComponent } from './components/setting.component';
import { DetailedComponent } from './components/detailed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { StorageDataBase } from './storage.database';
import { NewsAPIService } from './news-api.service';

import { RouterModule } from '@angular/router'

const ROUTES = [
  {path:'', component: ListComponent },
  {path:'settings', component: SettingComponent },
  {path:'detailed/:country', component: DetailedComponent },
  {path:'**', redirectTo:'', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SettingComponent,
    DetailedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ StorageDataBase, NewsAPIService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
