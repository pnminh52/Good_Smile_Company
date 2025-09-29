import React, { useEffect, useState } from "react";
import SliderBanner from './../../components/user/homepage/SliderBanner';
import Section1 from './../../components/user/homepage/Section1';
import SearchByBrand from './../../components/user/homepage/SearchByBrand';
import PreOrdersNow from './../../components/user/homepage/PreOrdersNow';
import Event from '../../components/user/homepage/Event';
import Loader from "../../components/Loader";
import NewsSection from "../../components/user/homepage/NewsSection";



const Homepage = () => {
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const timer =setTimeout(()=>{
      setLoading(false)
    }, 1000)
    return()=>clearTimeout(timer)
  },[])

  if(loading){
   return(
    <Loader />
   )
  }
  return (
   <div>
    <SliderBanner />
    <Section1  />
  <div className=" max-w-screen-xl mx-auto">
    {/* <Top10Revenue /> */}
  <PreOrdersNow  />

<SearchByBrand  />




  </div>
  <NewsSection />
  <div className="max-w-screen-xl mx-auto">
  <Event />
  </div>
   </div>
  );
};


export default Homepage;
