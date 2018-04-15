import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
>>>>>>> dc882d3968e0433b5fb360cbd5fc7f1f06a06f8d
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { CommunityModule } from './community/community.module';
import { ApiModule } from './api/api.module';
import { LoginFormModule } from './login-form/login-form.module';
import { SearchModule } from './search/search.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MemeDialogComponent } from './meme-dialog/meme-dialog.component';
import { MemeService } from './api/meme.service';

import { CreationModule } from './creation/creation.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    PageNotFoundComponent,
    MemeDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MatDialogModule,
    CommunityModule,
    CreationModule,
    ApiModule,
    SearchModule,
    FormsModule,
    ReactiveFormsModule,
    LoginFormModule,
  ],
  providers: [MemeDialogComponent, MemeService],
  bootstrap: [AppComponent],
  entryComponents: [MemeDialogComponent],
})
export class AppModule { }
