
import logo from './logo.svg';
import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
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
import { contextType } from './Types/Types';
import { UseDataContext } from './Context/UseDataContext';
import { UseAuthContext } from './Context/UseAuthContext';
import Session from './Pages/Session';
import { ProtectedRoutes } from './Shared/ProtectedRoutes';
import { GuestRoutes } from './Shared/GuestRoutes';
import { Loading } from './Shared/Loading';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHAJYVLlNM8u2L-PMngG-oeJ9BpEw6AqA",
  authDomain: "apartmentwebsite-fe584.firebaseapp.com",
  projectId: "apartmentwebsite-fe584",
  storageBucket: "apartmentwebsite-fe584.appspot.com",
  messagingSenderId: "649191728575",
  appId: "1:649191728575:web:020b8bf5025fb749a56d0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
export const colRef = collection(db, 'articles');
export const subRef = collection(db, 'subscribers');
export const formRef = collection(db, 'forms');

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

  useEffect(() => {
    dispatch({ type: 'loading', payload: true });

    const unSubscribe = onSnapshot(colRef, (snapshot) => {
      const data: contextType[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          fileUrls: docData.fileUrls || [],
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

  console.log("Current user in component:", user);

  if (loading || userloading) {
    return <Loading />;
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/trinityfoundation' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='donate' element={<Donation />} />
        <Route path='sendform' element={<SendMail />} />
        <Route path='news' element={<News />} />
        <Route path='session' element={<GuestRoutes user={user}><Session /></GuestRoutes>} />
      </Route>
      <Route path='/trinityfoundation/admin' element={<ProtectedRoutes user={user}><AdminLayout /></ProtectedRoutes>}>
        <Route index element={<Admin />} />
        <Route path='upload' element={<AdminUpload />} />
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
