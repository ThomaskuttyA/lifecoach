import React from 'react';
import Hero from '../components/Hero';
import CoursePlans from '../components/CoursePlans';
import VideoNotice from '../components/VideoNotice';
import Reviews from '../components/Reviews';
import { useContent } from '../context/ContentContext';

const Home = () => {
  const { isLoading } = useContent();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <CoursePlans />
      <VideoNotice />
      <Reviews />
    </>
  );
};

export default Home;
