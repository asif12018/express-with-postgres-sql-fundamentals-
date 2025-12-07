import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.loginUser(email, password);
    console.log(result)
    if(result === null){
      res.status(500).json({
        success: false,
        message: "invalid email or password"
      });

    }
    res.status(200).json({
      success: true,
      message: "login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const authController = {
    loginUser
}
