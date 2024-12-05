import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth-pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { outerGuard } from './core/guards/outer/outer.guard';
import { RegisterComponent } from './pages/auth-pages/register/register.component';
import { CreateTaskComponent } from './pages/user/create-task/create-task.component';
import { UpdateTaskComponent } from './pages/user/update-task/update-task.component';
import { AllTaskComponent } from './pages/user/all-task/all-task.component';

export const routes: Routes = [
    {'path': '', redirectTo: '/login', pathMatch: 'full'},
    {'path':'login','title':'Login',component:LoginComponent},
    {'path':'register','title':'Register',component:RegisterComponent},
    {'path':'create-task','title':'Create Task',component:CreateTaskComponent},
    {'path':'update-task/:id','title':'Update Task',component:UpdateTaskComponent},
    {'path':'all-task','title':'All Task',component:AllTaskComponent},
    {'path':'**',component:PageNotFoundComponent}
];
