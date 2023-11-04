import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/homepage.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { UserpageComponent } from './modules/userpage/userpage.component';
import { AdminpageComponent } from './modules/adminpage/adminpage.component';



const routes: Routes = [
  {path:"home", component:HomepageComponent},
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"user", component:UserpageComponent},
  {path:"admin", component:AdminpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
