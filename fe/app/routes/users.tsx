import { UserView } from "../views";
import { authController } from '../controllers';
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { userController } from '../controllers';

export default function UsersPage() {
  const navigate = useNavigate();

  userController.initialize();

  useEffect(() => {
    if (!authController.validateRoute()) {
      navigate("/");
      return;
    }
  }, [navigate]);

  if (!authController.validateRoute()) {
    return null;
  }

  return <UserView />;
}