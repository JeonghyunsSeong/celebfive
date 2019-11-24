import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";

import {
  FlashMessagesService,
  FlashMessagesModule
} from "angular2-flash-messages";

import { AuthGuard } from "./guards/auth.guard";

import { JwtModule } from "@auth0/angular-jwt";
import { ListComponent } from "./components/list/list.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule,
    HttpClientModule,
    FlashMessagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("id token");
        }
      }
    })
  ],
  providers: [ValidateService, FlashMessagesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
