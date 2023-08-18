import React, { FC } from "react";
import Header from "../../components/Header";

const LayoutProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="bg-background min-h-screen">{children}</div>
    </>
  );
};

export default LayoutProvider;
