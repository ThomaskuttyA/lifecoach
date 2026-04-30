import React from 'react';
import Hero from '../components/Hero';
import CoursePlans from '../components/CoursePlans';
import VideoNotice from '../components/VideoNotice';
import Reviews from '../components/Reviews';

const Home = () => {
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
