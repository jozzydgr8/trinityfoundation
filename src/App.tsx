
import logo from './logo.svg';
import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import HomePage from './Pages/HomePage';
import { Donation } from './Pages/Donation';
import SendMail from './Pages/SendMail';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { News } from './Pages/News';
import { Admin } from './Admin/Admin';
import AdminLayout from './Admin/AdminLayout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AdminUpload } from './Admin/AdminUpload';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { contextType, donorType, subscribeType } from './Types/Types';
import { UseDataContext } from './Context/UseDataContext';
import { UseAuthContext } from './Context/UseAuthContext';
import Session from './Pages/Session';
import { ProtectedRoutes } from './Shared/ProtectedRoutes';
import { GuestRoutes } from './Shared/GuestRoutes';
import { Loading } from './Shared/Loading';
import { initializeApp } from "firebase/app";
import StripeSuccess from './Pages/StripeSuccess'
import ResetPasswordPage from './Pages/ResetPasswordPage';
import UpdatePassword from './Pages/UpdatePassword';
import AcceptAdmin from './Admin/AcceptAdmin';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_apiKey,
  authDomain:process.env.REACT_APP_authDomain,
  projectId:process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId:process.env.REACT_APP_appId, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
export const colRef = collection(db, 'articles');
export const subRef = collection(db, 'subscribers');
export const formRef = collection(db, 'forms');
export const donorRef = collection(db, 'donations');
export const userRef = collection(db,'users');


function App() {
  const { dispatch, loading } = UseDataContext();
  const { user, dispatch: transmit, loading: userloading } = UseAuthContext();

  useEffect(() => {
    const animation = () => {
      var leftAnimate = document.querySelectorAll('.animate-left');
      var rightAnimate = document.querySelectorAll('.animate-right');
      var downAnimate = document.querySelectorAll('.animate-down');
      var upAnimate = document.querySelectorAll('.animate-up');

      var windowHeight = window.innerHeight;
      rightAnimate.forEach((container) => {
        var containerPosition = container.getBoundingClientRect().top;

        if (containerPosition < windowHeight) {
          container.classList.add('sectionAnimationRight');
        }
      });
      leftAnimate.forEach((container) => {
        var containerPosition = container.getBoundingClientRect().top;

        if (containerPosition < windowHeight) {
          container.classList.add('sectionAnimationLeft');
        }
      });
      upAnimate.forEach((container) => {
        var containerPosition = container.getBoundingClientRect().top;

        if (containerPosition < windowHeight) {
          container.classList.add('sectionAnimationUp');
        }
      });
      downAnimate.forEach((container) => {
        var containerPosition = container.getBoundingClientRect().top;

        if (containerPosition < windowHeight) {
          container.classList.add('sectionAnimationDown');
        }
      });
    };
    window.addEventListener('scroll', animation);
  }, []);

  // auth useeffect
  useEffect(() => {
    transmit({ type: 'loading', payload: true });
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        transmit({ type: 'getUser', payload: user });
        console.log('signed in', user);
        transmit({ type: 'loading', payload: false });
      } else {
        transmit({ type: 'getUser', payload: null });
        console.log('logged out');
        transmit({ type: 'loading', payload: false });
      }
    });

    return () => unSubscribe();
  }, []);


// data articles
  useEffect(() => {
    dispatch({ type: 'loading', payload: true });

    const unSubscribe = onSnapshot(colRef, (snapshot) => {
      const data: contextType[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          files: docData.files|| [],
          title: docData.title || '',
          description: docData.description || '',
          date: docData.date || '',
        };
      });

      dispatch({ type: 'getData', payload: data });
      console.log(data);
      dispatch({ type: 'loading', payload: false });
    }, (error) => {
      console.error('Error fetching data:', error);
      dispatch({ type: 'loading', payload: false });
    });

    return () => unSubscribe();
  }, []);
//subscription suvbred
useEffect(() => {
  dispatch({ type: 'loading', payload: true });
  if(!user){
    dispatch({ type: 'loading', payload: false });
    return
  }
  const unSubscribe = onSnapshot(subRef, (snapshot) => {
    const data: subscribeType[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        
        email: docData.email || '',
        date: docData.date || '',
      };
    });

    dispatch({ type: 'getSubscribers', payload: data });
    console.log(data);
    dispatch({ type: 'loading', payload: false });
  }, (error) => {
    console.error('Error fetching data:', error);
    dispatch({ type: 'loading', payload: false });
  });

  return () => unSubscribe();
}, [user]);

//donation useefecct
useEffect(() => {
  dispatch({ type: 'loading', payload: true });
  if(!user){
    dispatch({ type: 'loading', payload: false });
    return
  }
  const unSubscribe = onSnapshot(donorRef, (snapshot) => {
    const data: donorType[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        name: docData.name,
        amount: docData.amount,
        method: docData.method,
        status: docData.status,
        date: docData.date,
        message: docData.message,
        email: docData.email,
        currency:docData.currency
      };
    });

    dispatch({ type: 'getDonors', payload: data });
    console.log(data);
    dispatch({ type: 'loading', payload: false });
  }, (error) => {
    console.error('Error fetching data:', error);
    dispatch({ type: 'loading', payload: false });
  });

  return () => unSubscribe();
}, [user]);





  if (loading || userloading) {
    return <Loading />;
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='donate' element={<Donation />} />
        <Route path='sendform' element={<SendMail />} />
        <Route path='news' element={<News />} />
        <Route path='session' element={<GuestRoutes user={user}><Session /></GuestRoutes>} />
        <Route path='stripesuccess' element={<StripeSuccess/>}/>
      </Route>
      <Route path='/admin' element={<ProtectedRoutes user={user}><AdminLayout /></ProtectedRoutes>}>
        <Route index element={<Admin />} />
        <Route path='upload' element={<AdminUpload />} />
        <Route path='reset-password' element={<ResetPasswordPage/>}/>
        <Route path='settings' element={<Outlet/>}>
          <Route path='updatepassword' element={<UpdatePassword/>}/>
          <Route path='accept' element={<AcceptAdmin/>}/>
        </Route>
      </Route>
    </>
  ));
  return (
    <div className="App">
      <>
      
        <RouterProvider router={router} />
     

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      </>
    </div>
  );
}

export default App;
