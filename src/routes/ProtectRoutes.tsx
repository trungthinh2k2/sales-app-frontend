import { ReactNode } from "react";
import { Role } from "../models/user.model";
import { isLoginAccount } from "../services/user.service";
import { Navigate } from "react-router-dom";

const ProtectRouter = ({role, children}: {role: Role, children: ReactNode}) => {
    return isLoginAccount(role) ? children : <Navigate to="/auth/login" />;
}

export default ProtectRouter;