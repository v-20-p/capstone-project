import { createContext } from 'react';

type User = {
    firstName: string;
    email: string;
    emailNotifications: Record<string, unknown>;
    phoneNumber?: string
    hasAvatar?: boolean
    avatarPath?: string
    lastName?: string
  };
  
  type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
  };
  
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  

export default UserContext;