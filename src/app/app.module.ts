import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { FooterComponent } from './modules/footer/footer.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserpageComponent } from './modules/userpage/userpage.component';
import { AdminpageComponent } from './modules/adminpage/adminpage.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { ChatpageComponent } from './modules/chatpage/chatpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserpageComponent,
    AdminpageComponent,
    NotificationComponent,
    ChatpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
