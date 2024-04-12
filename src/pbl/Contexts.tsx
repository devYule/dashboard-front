import { createContext } from "react";
import { SidebarActions, SidebarDirections, SidebarSelectedItems } from "../interfaces/Interfaces";


export const SidebarDirectionContext = createContext(SidebarDirections.NONE);

export const SidebarActionContext = createContext(SidebarActions.HOVER);

export const SidebarSelectedItemContext = createContext(SidebarSelectedItems.ADD_WIDGET);