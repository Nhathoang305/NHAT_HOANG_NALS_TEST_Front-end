import { BlogModel } from "src/app/pages/master/models/blog.model";

export interface HttpClientResponse {
  blogs: BlogModel[],
  errors: object[];
}

export interface HttpClientRequest {
  page: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  search?:string
}
