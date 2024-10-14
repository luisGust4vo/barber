import { Request, Response } from "express";
import { UserDetailService } from "../../services/user/UserDetailService";

class UserDetailController {
  async handle(request: Request, response: Response) {
    const userDetailService = new UserDetailService();
    const userDetail = await userDetailService.execute();
    return response.json(userDetail);
  }
}

export { UserDetailController };
