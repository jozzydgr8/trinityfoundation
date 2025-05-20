import newImage from '../assets/crystalimg.jpg'
import imageone from '../assets/trinitygrouptwoimage.jpg'
import imagetwo from '../assets/trinitygroupimage.jpg'
import funmiPic from '../assets/Olufunmilola.jpg'
import dayoPic from '../assets/Dayo_otubu.jpg'
import taiwoPic from '../assets/taiwo_diyaolu.jpg'
import { query, where, getDocs, CollectionReference, DocumentData } from 'firebase/firestore';

export const backgroundimages = [
   {
    background:imageone
   },
    {
        background:imagetwo
    }
]
export const trusteeData = [
    {
      profile_pic:funmiPic,
      name: "Funmilola Fasanu",
      role: "Founder/CEO",
      title: "Theologian & Chaplain",
      description:
        "Funmilola Fasanu is a passionate theologian and chaplain, currently serving in a placement at Canterbury Christ Church University. She holds a BA in Theology and is the founder of both The Holy Trinity Christ Church Ministry C&S and The Trinity Arms Foundation, which focus on faith, emotional support, and community outreach. Through her work, Funmilola seeks to make a meaningful impact by providing spiritual guidance and promoting healing within the community."
    },
    {
      profile_pic:dayoPic,
      name: "Adedayo Otubu",
      role: "Trustee",
      title: "Certified Construction Worker & DJ",
      description:
        "Adedayo Otubu is a certified construction worker and a professional DJ, combining technical expertise with a passion for music. With a strong work ethic and creative flair, he seamlessly balances the demands of the construction industry while delivering unforgettable musical experiences."
    },
    {
      profile_pic:taiwoPic,
      name: "Taiwo Diyaolu",
      role: "Trustee",
      title: "Dedicated Carer",
      description:
        "Taiwo Diyaolu is a dedicated carer, committed to providing compassionate support and improving the well-being of those in her care. With a heart for service, she strives to make a positive difference in the lives of others through empathy and professionalism."
    }
  ];
  
  const contactInfo = {
    phone: "07586063904",
    email: "info@thetrinityarmsfoundation.com",
    address: "5, ST GEORGES ROAD, GILLINGHAM. KENT"
  };




 // const newImage = "https://example.com/path-to-your-default-image.jpg";

export const newsArticles = [
  {
    title: "Foundation Launches New Health Initiative",
    text: "The foundation announced a groundbreaking health program aimed at improving community wellness across underserved regions.",
    date: "2025-04-25",
    image: newImage
  },
  {
    title: "Educational Outreach Expands to Rural Areas",
    text: "Our team has extended educational services to rural communities, ensuring every child has access to quality learning resources.",
    date: "2025-04-20",
    image: newImage
  },
  {
    title: "Annual Fundraiser Exceeds Expectations",
    text: "Thanks to our generous donors, we surpassed our fundraising goals, enabling us to reach even more people in need.",
    date: "2025-04-15",
    image: newImage
  },
  {
    title: "New Partnership with Local Hospitals",
    text: "We are thrilled to announce a strategic partnership with regional hospitals to provide better healthcare solutions.",
    date: "2025-04-10",
    image: newImage
  },
  {
    title: "Celebrating Volunteers: Heroes Behind the Scenes",
    text: "On Volunteer Appreciation Day, we honor the incredible individuals who power our mission through their time and dedication.",
    date: "2025-04-05",
    image: newImage
  }
];





export const checkEmailExists = async (ref:CollectionReference<DocumentData, DocumentData>, email:string) => {
  const q = query(ref, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};


  