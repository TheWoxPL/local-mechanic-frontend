import { ResponseTokenDTO } from 'src/shared/dtos';
import { PropsWithChildren } from 'react';
import { AuthService } from 'src/services/authService';

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: ResponseTokenDTO['roles'];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const currentUser = AuthService.getCurrentUser();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.roles.join(',')))
  ) {
    return <div>Permission denied</div>;
  }

  return children;
}
