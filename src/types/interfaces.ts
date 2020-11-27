import { IconButton } from '@material-ui/core';
import { BETS_LOADED, BETS_LOADING } from '../redux/actions/types';
import { E_ERROR } from './enum';

// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

// AUTH
export interface ILoginUser {
  name?: string;
  email: string;
  password: string;
}

export interface IRegisterUser {
  username?: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILoginModal extends IAuthForm {
  login(user: ILoginUser): void;
  register(user: IRegisterUser): void;
}

export interface IRegisterModal extends IAuthForm {
  register(user: IRegisterUser): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: ILoginUser;
  };
}

// ITEMS
export interface IExistingItem {
  _id: string;
  name: string;
}

export interface IItem {
  _id?: string;
  name: string;
}

export interface IItemModal {
  isAuthenticated: boolean;
  addItem(item: IItem): void;
}

export interface IItemReduxProps extends IAuthReduxProps {
  item: {
    items: IExistingItem[];
  };
}

export interface IShoppingList {
  item: {
    items: IExistingItem[];
  };
  getItems(): void;
  deleteItem(id: string): void;
  isAuthenticated: boolean;
}

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  username?: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IExistingBet {
  _id: string;
  userId: String;
  placeDate: Date;
  betDate: Date;
  event: String;
  backOdds: Number;
  layOdds: Number;
  backAmount: Number;
  layAmount: Number;
  bookie: String;
  exchange: String
  commission: Number;
  sport: String
  freebet: String;
  outcome: String;
}

export interface IBet {
  _id?: String;
  userId: String;
  placeDate: Date;
  betDate: Date;
  event: String;
  backOdds: Number;
  layOdds: Number;
  backAmount: Number;
  layAmount: Number;
  bookie: String;
  exchange: String
  commission: Number;
  sport: String
  freebet: String;
  outcome: String;
}

export interface IBetList {
  bet: {
    bets: IExistingBet[]
  };
  loadBets(): void;
  isAuthenticated: boolean;
}

export interface IBetReduxProps extends IAuthReduxProps {
  bet: {
    bets: IExistingBet[];
  };
}

export interface IExistingBookie {
  _id: string;
  userId: String,
  balance: Number,
  inplay: Number
}

export interface IBankList {
  bank: {
    bookies: IExistingBookie[]
  };
  loadBookies(): void;
}

export interface IBankReduxProps extends IAuthReduxProps {
  bank: {
    bookies: IExistingBookie[];
  };
}