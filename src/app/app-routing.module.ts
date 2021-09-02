import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { GuardGuard } from './services/auth/guard.guard';

const routes: Routes = [
  {
    path: '', component:HomeComponent
  },
  {
    path:'posts-list',component:PostsListComponent, canActivate:[GuardGuard]
  },
  {
    path:'post-detail/:id',component:PostDetailComponent, canActivate:[GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
