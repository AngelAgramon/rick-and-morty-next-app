import LoginView from "../views/LoginView";
import { authController } from "../controllers/AuthController";
import { useNavigate } from "@remix-run/react";
import { authModel } from "~/models";

export default function Index() {
  const navigate = useNavigate();
  if (!authModel.isAuthenticated) {
    navigate('/characters');
  }
  
  return <LoginView />;
}
