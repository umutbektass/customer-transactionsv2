'use client';

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Sidebar from "./components/sidebar";
import Navbar from './components/navbar';
import { setAuthToken } from "../../lib/apiClient";
import { useSession } from "next-auth/react";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.accessToken) {
      setAuthToken(session.accessToken);
    }
  }, [session]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }
  const openSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  if (!session?.user) {
    redirect("/");
  }

  
  else{
    return (
      <div className="flex flex-col lg:flex-row h-screen">
        <div className={`w-48 h-full absolute duration-300 ease-out ${isSidebarOpen ? 'left-[0px]' : '-left-full'} lg:left-auto lg:relative z-5 `}>
          <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </div>
        <div className="w-full h-full mt-7 px-3 lg:px-12">
          <Navbar openSidebar={openSidebar} />
          <Toaster/>
          {children}
        </div>
      </div>
    );
  }
};

export default Layout;
