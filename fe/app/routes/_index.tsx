import LoginView from "../views/LoginView";
import { authController } from "../controllers/AuthController";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
 
export default function Index() {
  const navigate = useNavigate();
 
  useEffect(() => {
    if (authController.isAuthenticated) {
      navigate("/characters");
    }
  }, [navigate]);
 
  return <LoginView />;
}