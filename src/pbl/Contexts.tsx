import { Dispatch, SetStateAction, createContext } from "react";
import { LeftSidebarActions, SidebarActions } from "../interfaces/Interfaces";


export const SidebarActionContext = createContext<Dispatch<SetStateAction<SidebarActions>>>(() => { });
export const SidebarDirectionContext = createContext(null);
export const SidebarSelectedItemContext = createContext(null);

export const LeftSidebarActionContext = createContext<Dispatch<SetStateAction<LeftSidebarActions>>>(() => { });


