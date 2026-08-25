import {
  ShoppingOutlined,
  SkinOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  CompassOutlined,
  InboxOutlined,
  LinkOutlined,
} from "@ant-design/icons";


export const services = [
  {
    title: "Food Assistance",
    description:
      "Helping individuals and families access nutritious food through food parcels, community meals, and connections to local food banks.",
    icon: <ShoppingOutlined />,
  },
  {
    title: "Clothing & Essentials",
    description:
      "Providing access to good-quality clothing, shoes, and essential supplies for people who may be struggling to afford basic items.",
    icon: <SkinOutlined />,
  },
  {
    title: "Toiletries & Household",
    description:
      "Distributing toiletries, hygiene products, and household essentials to help people maintain dignity in their daily lives.",
    icon: <HomeOutlined />,
  },
  {
    title: "Educational Materials",
    description:
      "Supporting children and adult learners with access to books, stationery, and educational resources they might otherwise go without.",
    icon: <BookOutlined />,
  },
  {
    title: "Community Outreach",
    description:
      "Engaging directly with communities to understand local needs, build trust, and ensure support reaches the people who need it most.",
    icon: <TeamOutlined />,
  },
  {
    title: "Guidance & Signposting",
    description:
      "Providing information, advice, and connections to welfare services, housing support, debt advice, and other specialist organisations.",
    icon: <CompassOutlined />,
  },
];

export const impactStats = [
  {
    id: "food-parcels",
    title: "Food Parcels",
    description: "Distributed to families in need",
    icon: <InboxOutlined />,
  },
  {
    id: "community-hubs",
    title: "Community Hubs",
    description: "Active across the UK",
    icon: <HomeOutlined />,
  },
  {
    id: "volunteers",
    title: "Volunteers",
    description: "Dedicated to our mission",
    icon: <TeamOutlined />,
  },
  {
    id: "referral-partners",
    title: "Referral Partners",
    description: "Connecting people to support",
    icon: <LinkOutlined />,
  },
];

