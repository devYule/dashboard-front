import { createContext } from "react";

interface User {
    at: string | undefined | null;
    userLoginId: string | undefined | null;
    userNick: string | undefined | null;
    userMail: string | undefined | null;
}

export const UserContext = createContext<User | null>(null);

