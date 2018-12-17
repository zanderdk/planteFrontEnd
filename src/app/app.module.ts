import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatListModule,
        MatSliderModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule} from '@angular/material';
import { LedComponent } from './led/led.component';
import {APP_BASE_HREF} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducer';
import { LedEffects } from './led.effects';
import { FadeEffects } from './fade.effects';
import { FadeComponent } from './fade/fade.component';
import { BarComponent } from './bar/bar.component';
import { GlobalService } from './global.service';
import { AddFadeColorComponent } from './add-fade-color/add-fade-color.component';
import { FadeSettingComponent } from './fade-setting/fade-setting.component';
import { FormsModule } from '@angular/forms';
import { WifiSettingComponent } from './wifi-setting/wifi-setting.component';
import { WifiEffects } from './wifi.effects';
import { AddWifiComponent } from './add-wifi/add-wifi.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fade', component: FadeComponent },
  { path: 'addFadeColor/:index', component: AddFadeColorComponent },
  { path: 'fadeSettings', component: FadeSettingComponent },
  { path: 'wifi', component: WifiSettingComponent },
  { path: 'addWifi/:index', component: AddWifiComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LedComponent,
    FadeComponent,
    BarComponent,
    AddFadeColorComponent,
    FadeSettingComponent,
    WifiSettingComponent,
    AddWifiComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LedEffects, FadeEffects, WifiEffects]),
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
