import React from 'react';
import { useLoader } from '../context/loaderContext';
import { MoonLoader} from 'react-spinners'
const GlobalLoader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center h-screen">
    <MoonLoader size={50} color="#3b82f6" />
  </div>
  );
};

export default GlobalLoader;
