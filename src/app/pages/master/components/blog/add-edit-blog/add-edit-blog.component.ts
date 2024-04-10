import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../http-services/blog.service';
import { BlogModel } from '../../../models/blog.model';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.scss']
})
export class AddEditBlogComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @Output() isReset = new EventEmitter<any>();
  public blogDetailGroup: FormGroup = new FormGroup({});
  public isEdit: boolean = false;
  public hideShowToast: boolean = false;
  public hideShowPopup: boolean = false

  public constructor(
    private fb: FormBuilder,
    private blogHttp: BlogService
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(initData?: BlogModel) {
    this.blogDetailGroup = this.fb.group({
      id: new FormControl(initData?.id ? initData.id : null),
      content: new FormControl(initData?.content ? initData.content : null,[Validators.required]),
      image: new FormControl(initData?.image ? initData.image : null, [Validators.required]),
      title: new FormControl(initData?.title ? initData.title : null, [Validators.required]),
    })
  }

  public handleGetBlogDetail(id:string): void {
    this.blogHttp.getBlogDetail(id).subscribe((results) => {
      if ((results as HttpErrorResponse).status === 404) {
        console.log((results as HttpErrorResponse).status);
      }
      this.initForm((results as BlogModel))
    })
  }

  public openModal(id?:string) {
    this.hideShowPopup= true;
    if (id){
      this.isEdit=true;
      this.handleGetBlogDetail(id);
    }else{
      this.isEdit = false;
      this.initForm()
    }
  }

  public closeModal() {
    this.hideShowPopup = false;
    this.blogDetailGroup.reset();
  }

  public handleHideShowToast(param:boolean){
    this.hideShowToast = param;
  };

  public handleSubmit(){

    if(this.isEdit){
      this.blogHttp.editBlog(this.blogDetailGroup.getRawValue(),this.blogDetailGroup.get('id')?.getRawValue()).subscribe(res => {
        if ((res as HttpErrorResponse).status &&(res as HttpErrorResponse).status !==200) {
          setTimeout(() => { this.handleHideShowToast(false) }, 2000);
          this.hideShowToast = true
        } else {
          this.isReset.emit(true);
          this.hideShowToast = true
          setTimeout(() => { this.handleHideShowToast(false) }, 2000);
          this.closeModal();
        }
      })
    }else{
      this.blogHttp.createBlog(this.blogDetailGroup.getRawValue()).subscribe(res => {
        if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
          setTimeout(() => { this.handleHideShowToast(false) }, 2000);
          this.hideShowToast = true
        } else {
          this.isReset.emit(true);
          this.hideShowToast = true
          setTimeout(() => { this.handleHideShowToast(false) }, 2000);
          this.closeModal();
        }
      })
    }
  }
}
