import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <p>Banner</p>
      <p>navbar</p>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <p>footer</p>
      <p>cartSidebar</p>
    </>
  );
};

export default AppLayout;
