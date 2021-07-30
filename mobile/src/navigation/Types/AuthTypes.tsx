// * Reducer types and interfaces
export type TActionType = "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT";
export type TUserToken = string | null;

export interface IReducerState {
  userToken: string | null;
  isSignout: boolean;
}
export interface IAction {
  type: TActionType;
  userToken: TUserToken;
}
