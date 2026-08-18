
import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import HomePage from './Pages/homepage/HomePage';
import { Donation } from './Pages/Donation';
import SendMail from './Pages/SendMail';
import { ToastContainer } from "react-toastify";
import { News } from './Pages/newspage/News';
import { Admin } from './Admin/Admin';
import AdminLayout from './Admin/AdminLayout';
import { AdminUpload } from './Admin/AdminUpload';
import { UseDataContext } from './Context/UseDataContext';
import { UseAuthContext } from './Context/UseAuthContext';
import Session from './Admin/pages/Session';
import { ProtectedRoutes } from './Shared/ProtectedRoutes';
import { GuestRoutes } from './Shared/GuestRoutes';
import { Loading } from './Shared/Loading';
import StripeSuccess from './Pages/StripeSuccess'
import ResetPasswordPage from './Pages/ResetPasswordPage';
import UpdatePassword from './Pages/UpdatePassword';
import AcceptAdmin from './Admin/AcceptAdmin';
import { AdminUsers } from './Admin/AdminUsers';
import { SingleNewsPage } from './Pages/newspage/subpage/SingleNewsPage';







function App() {
  const { dispatch, loading } = UseDataContext();
  const { user, dispatch: handle, loading: userloading } = UseAuthContext();
  
  //useEffect to fetch blog from backend
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch('https://trinityarms.vercel.app/blog');
        if(!response.ok){
          throw Error('Failed to fetch data')
        }
        const json = await response.json();
        console.log('blog',json);
        dispatch({type:'getBlogs', payload:json});
      }catch(error){
        console.error('error fetching data', error)
      }finally{
        dispatch({type:'loading', payload:false})
      }
    }
    fetchData();
  },[])
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


   //useffect for authentication
useEffect(() => {
  handle({ type: 'loading', payload: true });

  const data = localStorage.getItem('user');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      const now = new Date().getTime();
      const expiryDays = 3;
      const expiryTime = expiryDays * 24 * 60 * 60 * 1000; // days to ms

      if (now - parsed.savedAt < expiryTime) {
        // Not expired
        handle({ type: 'getUser', payload: parsed.user });
      } else {
        // Expired
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.error('Failed to parse user data:', e);
      localStorage.removeItem('user');
    }
  }

  handle({ type: 'loading', payload: false });
}, [handle]);


//useEffect to fetch subscribers
useEffect(()=>{
  const fetchSubscribers = async()=>{
    if(!user){
      return handle({type:"loading", payload:false})
    }
    try{
      const response = await fetch('https://trinityarms.vercel.app/subscribe',{
      headers:{
        'Authorization': `Bearer ${user?.token}`
      }
    })
    if(!response.ok){
      throw Error('an error occured')
    }
    const json = await response.json();
    console.log('subscribers',json)
    dispatch({type:'getSubscribers', payload:json})
    }catch(error){
      console.error(error)
    }
  }
  fetchSubscribers();
},[user, handle, dispatch]);


//use effect to fetch authorities
useEffect(()=>{
  const fetchAuthorities = async()=>{
    if(!user){
      return handle({type:"loading", payload:false})
    }
    try{
      const response = await fetch('https://trinityarms.vercel.app/user/getusers',{
      headers:{
        'Authorization': `Bearer ${user?.token}`
      }
    })
    if(!response.ok){
      throw Error('an error occured')
    }
    const json = await response.json();
    dispatch({type:'getAdminUsers', payload:json})
    }catch(error){
      console.error(error)
    }
  }
  fetchAuthorities();
},[user])
  

//admin collection useeffect









 


  //use effect to fetch volunteer
useEffect(()=>{
  const fetchVolunteer = async()=>{
    if(!user){
      return handle({type:"loading", payload:false})
    }
    try{
      const response = await fetch('https://trinityarms.vercel.app/volunteers',{
      headers:{
        'Authorization': `Bearer ${user?.token}`
      }
    })
    if(!response.ok){
      throw Error('an error occured')
    }
    const json = await response.json();
    dispatch({type:'getVolunteer', payload:json})
    }catch(error){
      console.error(error)
    }
  }
  fetchVolunteer();
},[user])
  

//admin collection useeffect









  if (loading || userloading) {
    return <Loading />;
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='donate' element={<Donation />} />
        <Route path='sendform' element={<SendMail />} />
        <Route path='news' element={<Outlet/>} >
          <Route index element={<News/>}/>
          <Route path=':id' element={<SingleNewsPage/>}/>
        </Route>
        <Route path='session' element={<GuestRoutes user={user}><Session /></GuestRoutes>} />
        <Route path='stripesuccess' element={<StripeSuccess/>}/>
      </Route>
      <Route path='/admin_jctbdil1$' element={<ProtectedRoutes user={user}><AdminLayout /></ProtectedRoutes>}>
        <Route index element={<Admin />} />
        <Route path='upload' element={<AdminUpload />} />
        <Route path='reset-password' element={<ResetPasswordPage/>}/>
        <Route path='settings' element={<Outlet/>}>
          <Route path='updatepassword' element={<UpdatePassword/>}/>
          <Route path='accept' element={<AcceptAdmin/>}/>
          <Route path='adminUsers' element={<AdminUsers/>}/>
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
