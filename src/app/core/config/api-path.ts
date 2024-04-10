import { environment } from "src/environments/environment";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {
  public static BLOGS = environment.API_AUTH.concat(ApiPathConfig.blog.list)
}
