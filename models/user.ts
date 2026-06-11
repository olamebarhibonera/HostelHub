export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  phoneNumber: string;
  university: string;
  createdAt: Date;
  isEmailVerified: boolean;
}

export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export function getInitials(user: User): string {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
}
