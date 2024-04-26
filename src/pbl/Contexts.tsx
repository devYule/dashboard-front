import { Dispatch, SetStateAction, createContext } from "react";
import {
  LeftSidebarActions,
  ModalType,
  SidebarActions,
  WidgetInter,
} from "../interfaces/Interfaces";

export const SidebarActionContext = createContext<
  Dispatch<SetStateAction<SidebarActions>>
>(() => {});
export const SidebarDirectionContext = createContext(null);
export const SidebarSelectedItemContext = createContext(null);

export const LeftSidebarActionContext = createContext<
  Dispatch<SetStateAction<LeftSidebarActions>>
>(() => {});

export const MypageModalSetterContext = createContext<
  Dispatch<SetStateAction<ModalType>>
>(() => {});

export const AllUserDatasContext = createContext<{
  pic: string | null;
  nick: string;
  mail: string;
  sites: number[];
}>({ pic: "", nick: "", mail: "", sites: [] });
export const SetAllUserDatasContext = createContext<
  Dispatch<
    SetStateAction<{
      pic: string | null;
      nick: string;
      mail: string;
      sites: number[];
    }>
  >
>(() => {});

export const AddWidgetContext = createContext<
  Dispatch<SetStateAction<WidgetInter | null>>
>(() => {});
