import { UserRole } from "./user-role.enum";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}
