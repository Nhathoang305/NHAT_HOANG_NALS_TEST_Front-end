import { HttpClientRequest, HttpClientResponse } from "src/app/core/models/http-repsonse.model";

  export interface BlogModel {
    id?: string,
    title?:string,
    image?:string,
    content?:string,
    body?:string | object
  }

export interface BlogListModel {
  search?: string,
  blogs: Array<BlogModel>
}
export interface GetBlogRequest extends HttpClientRequest {}



export interface BlogsResponse extends HttpClientResponse {
  data: BlogModel[]
}
