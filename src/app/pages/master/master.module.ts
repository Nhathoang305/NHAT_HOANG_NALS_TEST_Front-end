import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/layout/components/loading-spinner/loading-spinner.component';
import { AddEditBlogComponent } from './components/blog/add-edit-blog/add-edit-blog.component';
import { ListBlogComponent } from './components/blog/list-blog/list-blog.component';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';


@NgModule({
  declarations: [
    MasterComponent,
    AddEditBlogComponent,
    ListBlogComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    MasterRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MasterModule { }
