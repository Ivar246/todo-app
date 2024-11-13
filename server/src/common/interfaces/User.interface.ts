export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export type UserWithoutPassword = Omit<User, 'password_hash'>;

export type AuthPayload = Pick<User, 'id' | 'email' | 'role'>;
