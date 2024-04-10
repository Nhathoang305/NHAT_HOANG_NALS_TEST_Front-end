import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/layout/components/loading-spinner/loading-spinner.component';
import { environment } from 'src/environments/environment';
import { BlogService } from '../../../http-services/blog.service';
import { BlogModel, GetBlogRequest } from '../../../models/blog.model';
import { AddEditBlogComponent } from '../add-edit-blog/add-edit-blog.component';
@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  @ViewChild(AddEditBlogComponent) addEditComponent!: AddEditBlogComponent;
  @ViewChild(LoadingSpinnerComponent) loadingComponent!: LoadingSpinnerComponent;
  public blogGroup: FormGroup = new FormGroup({});
  public totalRecordDefault: number = 0;
  public totalRecord: number = 0;
  public totalPage: number[] = [];
  public isSuccess:boolean = false;
  public hideShowToast: boolean = false;
  public requestParam: GetBlogRequest = {
    page: environment.page,
    limit: environment.limit,
    sortBy: 'id',
    order: 'asc'
  };

  public constructor(
    private blogHttp: BlogService,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.blogHttp.getBlog({
      page: 1,
      sortBy: 'id',
      order: 'asc'
    }).subscribe((results) => {
      this.totalRecordDefault = (results as BlogModel[]).length;
      this.handleSetPage(this.totalRecordDefault)
    })
    this.handleGetListBlog(this.requestParam);
    this.initForm();
  }


  private initForm(initData?: BlogModel[]) {
    this.blogGroup = this.fb.group({
      search: new FormControl(initData ? this.blogGroup.get('search')?.getRawValue() : ''),
      blogs: this.fb.array((initData && initData.length > 0)
        ? initData.map((el) => this.createDataGroup(el)) : [])
    })
  }

  public get data(): FormArray {
    return this.blogGroup.get('blogs') as FormArray;
  }

  //Handle create form
  private createDataGroup(data: BlogModel): FormGroup {
    const arrayDataList = this.fb.group({
      id: new FormControl(data.id ? data.id : null),
      content: new FormControl(data.content ? data.content : null),
      image: new FormControl(data.image ? data.image : null),
      title: new FormControl(data.title ? data.title : null),
    })

    return arrayDataList;
  }

  //Handle call api list blog
  public handleGetListBlog(requestParam: GetBlogRequest): void {
    this.blogHttp.getBlog(requestParam).subscribe((results) => {
      if ((results as HttpErrorResponse).status &&(results as HttpErrorResponse).status === 404) {
        this.isSuccess= false;
        this.hideShowToast = true;
        setTimeout(() => { this.hideShowToast = false; }, 2000);
        this.loadingComponent.closeModal();
      }else{
        this.initForm((results as BlogModel[]));
        this.totalRecord = Number((results as BlogModel[]).length);
        this.loadingComponent.closeModal();
      }

    })
  }

  //Handle call data by page number
  public handlePagination(pageNumber: number) {
    if (pageNumber === -1) {
      this.requestParam.page = this.requestParam?.page - 1
    } else if (pageNumber === 0) {
      this.requestParam.page = this.requestParam?.page + 1
    } else {
      this.requestParam.page = pageNumber;
    }
    this.loadingComponent.openModal();

    this.handleGetListBlog(this.requestParam);
  }

  //Handle call data by key search
  public handleSearch() {
    this.requestParam = {
      page: environment.page,
      limit: environment.limit,
      sortBy: 'id',
      order: 'asc'
    }
    if (this.blogGroup.get('search')?.getRawValue() !== ''){
      this.requestParam.search = this.blogGroup.get('search')?.getRawValue();
      this.loadingComponent.openModal();
      this.handleGetListBlog(this.requestParam);
      this.handleSetPage(this.totalRecord)
    }
  }

  //Processes dividing data into pages
  public handleSetPage(totalRecord: number) {
    this.totalPage = Array.from(Array(Number(Math.round(totalRecord / environment.limit))).keys())
  }

  //handle reset data default
  public handleClear() {
    this.requestParam = {
      page: environment.page,
      limit: environment.limit,
      sortBy: 'id',
      order: 'asc'
    }
    this.blogGroup.get('search')?.setValue('');
    this.loadingComponent.openModal();
    this.handleGetListBlog(this.requestParam);
    this.handleSetPage(this.totalRecordDefault)
  }

  //handle open popup edit blog
  public handleEditBlog(id:string) {
    this.addEditComponent.openModal(id);
  }

  //handle open popup add blog
  public handleAddBlog() {
    this.addEditComponent.openModal();
  }


  //Handle change param sort
  public handleSort(param:string){
    this.requestParam.page = environment.page
    this.requestParam.sortBy = param
    this.loadingComponent.openModal();
    this.handleGetListBlog(this.requestParam);
  }

  public handleClearAndShowToast(): void {
    this.isSuccess=true;
    this.handleClear();
    this.hideShowToast = true;
    setTimeout(() => { this.hideShowToast = false; }, 2000);
  }
}
