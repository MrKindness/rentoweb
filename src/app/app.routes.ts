import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { Constants } from './utils/constants';
import { AuthComponent } from './components/auth/auth.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: Constants.authPage, component: AuthComponent},
    { path: Constants.registerPage, component: RegisterComponent},
    { path: '**', component: NotFoundComponent}
];
 