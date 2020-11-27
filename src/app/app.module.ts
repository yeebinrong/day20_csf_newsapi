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
import { NewsAPIServiceService } from './news-apiservice.service';

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
    HttpClientModule

  ],
  providers: [ StorageDataBase, NewsAPIServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
