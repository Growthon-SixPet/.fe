import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { InterestProvider } from "./pages/mypage/contexts/InterestContext";
import "./router/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InterestProvider>
      <RouterProvider router={router} />
    </InterestProvider>
  </React.StrictMode>
);
