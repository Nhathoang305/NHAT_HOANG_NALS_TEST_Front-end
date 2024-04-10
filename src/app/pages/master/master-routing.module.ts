import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ListBlogComponent } from './components/blog/list-blog/list-blog.component';
import { MasterComponent } from './master.component';

const routes: Routes = [
  { path: '', component: MasterComponent,
  children: [
    { path: '', redirectTo: 'master', pathMatch: 'full' },
    {
      path: 'master', component: BlogComponent, children:[
        { path: '', redirectTo: 'blogs', pathMatch: 'full' },
        { path: 'blogs', component: ListBlogComponent }
      ]
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
