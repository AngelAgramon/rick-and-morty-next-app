import LoginView from "../views/LoginView";
import { authModel } from "../models/AuthModel";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
 
export default function Index() {
  const navigate = useNavigate();
 
  useEffect(() => {
    if (authModel.isAuthenticated) {
      navigate("/characters");
    }
  }, [navigate]);
 
  return <LoginView />;
}