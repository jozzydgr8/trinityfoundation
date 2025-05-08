export type MenuItem = {
    label: React.ReactNode; // `label` can be a string or any ReactNode (e.g., JSX, string)
    key: string; // key is required for each menu item
    icon: React.ReactNode
  };

  export type contextType ={
    id:string
    fileUrls?:{
        imagePath: string
        url?:string,
    }[]
    description:string,
    title:string,
    date:string
} 