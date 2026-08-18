export type MenuItem = {
    label: React.ReactNode; // `label` can be a string or any ReactNode (e.g., JSX, string)
    key: string; // key is required for each menu item
    icon: React.ReactNode;
    children?:{
      label:string,
      key:string,

    }[]
  }
 

  export type User = {
    _id: string,
    email:string,
    token?:string,
    admin?:true
}

export type Donation = {
  _id: string;

  name: string;
  email?: string;
  phone?: string;

  anonymous: boolean;

  amount: number;
  currency: 'USD' | 'GBP' | 'NGN';

  comment?: string;

  paymentMethod:
    | 'Stripe'
    | 'PayPal'
    | 'Bank Transfer';

  paymentStatus:
    | 'pending'
    | 'completed'
    | 'failed'
    | 'cancelled';

  transactionId?: string;

  stripeSessionId?: string;

  paypalOrderId?: string;

  createdAt: string;
  updatedAt: string;
};

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

  

export type Volunteer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  about?: string;
  createdAt: string;
  updatedAt: string;
};


export type subscribeType ={
  id: string;
  email: string;
  date:string
}