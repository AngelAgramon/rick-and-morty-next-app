import { AuthApi } from "../services";
import { makeAutoObservable } from "mobx";
import { useNavigate } from "@remix-run/react";
import { authModel } from "../models";

class AuthController {
  constructor() {
    makeAutoObservable(this);
  }
  login = async (username: string, password: string): Promise<boolean> => {
    try {
      const api = new AuthApi();
      const response = await api.simulateLogin(username, password);
      if (response.success && response.token) {
        authModel.userName = username;
        authModel.token = response.token;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  validateRoute = () => {
    const navigate = useNavigate();
    if (!authModel.isAuthenticated) {
      navigate("/");
    }
  };

  logout = () => {
    const navigate = useNavigate();
    authModel.token = null;
    authModel.userName = null;
    navigate("/");
  };
}
const authController = new AuthController();
export { authController };
