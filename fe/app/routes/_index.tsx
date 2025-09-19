import LoginView from "../views/LoginView";
import AuthPage from "./auth";
import { authController } from "../controllers/AuthController";
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = authController;

  if (!isAuthenticated) {
    navigate('/characters');
  }
  
  return <AuthPage />;
}
