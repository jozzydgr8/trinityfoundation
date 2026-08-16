export type MenuItem = {
    label: React.ReactNode; // `label` can be a string or any ReactNode (e.g., JSX, string)
    key: string; // key is required for each menu item
    icon: React.ReactNode;
    children?:{
      label:string,
      key:string,

    }[]
  }
  export type adminType ={
    id:string,
    email:string,
    admin: boolean,
  }

  export type formType = {
    about:string
    address:string
    email:string
    firstName:string
    lastName:string
  }

  export type Blog = {
  _id: string;
  title: string;
  featuredImage: string;
  category:
    string;
  excerpt: string;
  featured: boolean;
  readingTime: string;
  createdAt: string;
  likes?:number;
  shareCount?:number;
};

  

export type donorType = {
  id: string;
  name: string;
  amount: number;
  method:  'Stripe' | 'Flutterwave' | 'PayPal' | 'Bank Transfer'; // Adjust as needed
  status: 'successful' | 'pending' | 'failed' | 'completed'; // Extend if you use other statuses
  date: string; // ISO format (e.g., "2025-04-25")
  message?: string;
  email: string;
  currency?:string;
}

export type subscribeType ={
  id: string;
  email: string;
  date:string
}