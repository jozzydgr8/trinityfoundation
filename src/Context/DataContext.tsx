import { createContext, useReducer } from "react";
import {
  User,
  Blog,
  Donation,
  Volunteer,
  subscribeType,
  Product,
} from "../Types/Types";

export type valueProps = stateProps & {
  dispatch: React.Dispatch<actionProps>;
};

type contextProps = {
  children: React.ReactNode;
};

export type stateProps = {
  blog: Blog[] | null;
  loading: boolean;
  donors: Donation[] | null;
  subscribers: subscribeType[] | null;
  adminUsers: User[] | null;
  volunteers: Volunteer[] | null;
  products: Product[] | null;
};

type actionProps =
  | blogAction
  | loadAction
  | donorAction
  | subscribeAction
  | adminAction
  | deleteadminProps
  | createadminProps
  | volunteeraction
  | deleteBlogProps
  | addBlogProps
  | updateBlogProps
  | productAction
  | addProductProps
  | updateProductProps
  | deleteProductProps;

type blogAction = {
  payload: Blog[];
  type: "getBlogs";
};

type updateBlogProps = {
  type: "updateBlog";
  payload: Blog;
};

type addBlogProps = {
  type: "addBlog";
  payload: Blog;
};

type deleteBlogProps = {
  type: "deleteBlog";
  payload: string;
};

type adminAction = {
  payload: User[];
  type: "getAdminUsers";
};

type deleteadminProps = {
  type: "deleteadmin";
  payload: string;
};

type createadminProps = {
  type: "createadmin";
  payload: User;
};

type donorAction = {
  payload: Donation[];
  type: "getDonors";
};

type subscribeAction = {
  payload: subscribeType[];
  type: "getSubscribers";
};

type loadAction = {
  payload: boolean;
  type: "loading";
};

type volunteeraction = {
  payload: Volunteer[];
  type: "getVolunteer";
};

// Product actions
type productAction = {
  payload: Product[];
  type: "getProducts";
};

type addProductProps = {
  type: "addProduct";
  payload: Product;
};

type updateProductProps = {
  type: "updateProduct";
  payload: Product;
};

type deleteProductProps = {
  type: "deleteProduct";
  payload: string;
};

const initialState: stateProps = {
  blog: null,
  loading: false,
  donors: null,
  subscribers: null,
  adminUsers: null,
  volunteers: null,
  products: null,
};

export const Context = createContext({} as valueProps);

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case "getBlogs":
      return {
        ...state,
        blog: action.payload,
      };

    case "loading":
      return {
        ...state,
        loading: action.payload,
      };

    case "getDonors":
      return {
        ...state,
        donors: action.payload,
      };

    case "getSubscribers":
      return {
        ...state,
        subscribers: action.payload,
      };

    case "getAdminUsers":
      return {
        ...state,
        adminUsers: action.payload,
      };

    case "deleteadmin":
      return {
        ...state,
        adminUsers:
          state.adminUsers?.filter(
            (admin) => admin._id !== action.payload
          ) ?? null,
      };

    case "createadmin":
      return {
        ...state,
        adminUsers: [
          action.payload,
          ...(state.adminUsers ?? []),
        ],
      };

    case "getVolunteer":
      return {
        ...state,
        volunteers: action.payload,
      };

    case "deleteBlog":
      return {
        ...state,
        blog:
          state.blog?.filter(
            (blog) => blog._id !== action.payload
          ) ?? null,
      };

    case "updateBlog":
      return {
        ...state,
        blog:
          state.blog?.map((blog) =>
            blog._id === action.payload._id
              ? action.payload
              : blog
          ) ?? null,
      };

    case "addBlog":
      return {
        ...state,
        blog: [
          ...(state.blog || []),
          action.payload,
        ],
      };

    // Products
    case "getProducts":
      return {
        ...state,
        products: action.payload,
      };

    case "addProduct":
      return {
        ...state,
        products: [
          ...(state.products || []),
          action.payload,
        ],
      };

    case "updateProduct":
      return {
        ...state,
        products:
          state.products?.map((product) =>
            product._id === action.payload._id
              ? action.payload
              : product
          ) ?? null,
      };

    case "deleteProduct":
      return {
        ...state,
        products:
          state.products?.filter(
            (product) => product._id !== action.payload
          ) ?? null,
      };

    default:
      return state;
  }
};

export const DataContext = ({ children }: contextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};