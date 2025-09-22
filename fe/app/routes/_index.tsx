import LoginView from "../views/LoginView";
import { authController } from "../controllers/AuthController";
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();
  if (!authController.isAuthenticated) {
    navigate('/characters');
  }
  
  return <LoginView />;
}
