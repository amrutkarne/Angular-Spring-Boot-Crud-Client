import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {path : '', redirectTo: 'view-user', pathMatch: 'full'},
  {path : 'view-user', component: UserListComponent },
  {path : 'add-usr',component:AddUserComponent},
  {path : 'update-usr/:id',component:UpdateUserComponent},
  {path : 'delete-usr/:id',component:UserListComponent},
  {path : 'user-details/:id', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
