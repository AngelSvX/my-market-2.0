import { Navigate } from "react-router";

interface StepGuardProps {
  canAccess: boolean;
  children: React.ReactNode
}

export const StepGuard = ({canAccess, children} : StepGuardProps) => {
  if(!canAccess){
    return <Navigate to="/register" replace/>
  }

  return children

}