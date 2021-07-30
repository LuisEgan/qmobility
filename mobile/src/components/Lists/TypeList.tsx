import { TIcon } from "../svg/icons/TypeIcons";

export interface IRoute {
  icon?: TIcon;
  title?: string;
  details?: string;
}

type IRoutesArray = Array<IRoute>;

export type TList = IRoutesArray | undefined;
