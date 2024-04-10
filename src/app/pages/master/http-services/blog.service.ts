import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import queryString from 'query-string';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-repsonse.model';
import { HttpService } from 'src/app/core/service/http/http.service';
import { BlogModel, GetBlogRequest } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends HttpService {

  public constructor(
    protected override http: HttpClient,
  ) {
    super(http);
  }

  public getBlog(param: GetBlogRequest){
    const convert = queryString.stringify(param);
    return this.get(`${ApiPath.BLOGS}?${convert}`).pipe(
      map((response: BlogModel[] | HttpClientResponse | HttpErrorResponse) => response)
    );
  }
  public getBlogDetail(id: string) {
    return this.get(`${ApiPath.BLOGS}/${id}`).pipe(
      map((response: BlogModel | HttpClientResponse | HttpErrorResponse) => response)
    );
  }

  public createBlog(payload: BlogModel): Observable<BlogModel> {
    return this.post(ApiPath.BLOGS, payload).pipe(
      map((response: any) => response)
    ) as Observable<BlogModel>;
  }

  public editBlog(payload: BlogModel,id:string): Observable<BlogModel> {
    return this.put(`${ApiPath.BLOGS}/${id}`, payload).pipe(
      map((response: BlogModel | HttpClientResponse  | HttpErrorResponse) => response)
    ) as Observable<BlogModel>;
  }
}
