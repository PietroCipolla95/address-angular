import { Routes } from '@angular/router';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnagraphicsViewComponent } from './anagraphics/anagraphics-view/anagraphics-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { SingleAnagraphicComponent } from './anagraphics/single-anagraphic/single-anagraphic.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { authGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: HomeViewComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginViewComponent },
    { path: 'users', component: UsersViewComponent, canActivate: [authGuard], data: { adminOnly: true } },
    { path: 'users/:id', component: SingleUserComponent, canActivate: [authGuard], data: { adminOnly: true } },
    { path: 'users/edit/:id', component: UserEditComponent, canActivate: [authGuard], data: { adminOnly: true } },
    { path: 'anagraphics', component: AnagraphicsViewComponent, canActivate: [authGuard] },
    { path: 'anagraphics/:id', component: SingleAnagraphicComponent, canActivate: [authGuard] },
    { path: 'app', component: AppComponent },
    { path: '**', component: NotFoundComponent, canActivate: [authGuard] }
];
