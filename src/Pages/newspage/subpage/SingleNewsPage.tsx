import { useParams } from "react-router-dom";
import { UseDataContext } from "../../../Context/UseDataContext";
import { BlogList } from "../newscomponent/BlogList";
import Footer from "../../../Shared/Footer";
import { MainBlog } from "./subComponent/MainBlog";
export const SingleNewsPage = ()=>{
    const { id } = useParams();
  const { blog } = UseDataContext();

    // 1. Find the specific blog matching the URL ID
  // We use .find() because it returns the single object, whereas .filter() returns an array
  const currentBlog = blog?.find((blog) => blog._id === id);
    // 2. Handle the loading/not found state gracefully 
  // (In case context is still fetching data or the ID doesn't exist)
  if (!currentBlog) {
    return (
      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Blog post not found</h2>
        <p>It looks like this article doesn't exist or is still loading.</p>
      </section>
    );
  }
    return(
        <>
            <MainBlog currentBlog={currentBlog}/>
            <BlogList/>
            <Footer/>
        </>
    )
}