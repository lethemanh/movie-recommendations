import { createContext, Dispatch, SetStateAction } from "react";

type UserType = { image: string | null } | null;

export interface IUserContextValue {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

export const userContext = createContext<IUserContextValue>({
  user: null,
  setUser: () => {},
});
