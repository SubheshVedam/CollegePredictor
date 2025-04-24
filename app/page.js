"use client";
import React, { Suspense } from "react";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const page = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </Provider>
  );
};

export default page;
