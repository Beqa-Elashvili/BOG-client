"use client";

import React, { useEffect } from "react";
import StoreProvider, { useAppSelector } from "./redux";
import Header from "./components/header";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";
import useGetProtectedData from "./hooks/useGetPotectedData/useGetProtectedData";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { getProtectedData } = useGetProtectedData();
  const { isUser } = useAppSelector((state) => state.global);
  const pathname = usePathname();
  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <div className="w-full  bg-black flex justify-center">
      <div className="min-w-[375px] relative  max-w-[430px] bg-gray-900 text-white  h-full min-h-screen">
        <div
          className={`${
            isUser && pathname !== "/transaction" ? "block" : "hidden"
          }`}
        >
          <Header />
        </div>
        <main>{children}</main>
        <div
          className={`sticky z-0 bottom-0 w-full max-w-[430px] ${
            !isUser ? "hidden" : "block"
          }`}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
export default DashboardWrapper;
