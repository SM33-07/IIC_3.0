import React,{useEffect} from 'react';
import IntroWrapper from "../components/IntroWrapper.tsx";

const Intro: React.FC = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1931]">
      <IntroWrapper />
    </div>
  );
};

export default Intro;