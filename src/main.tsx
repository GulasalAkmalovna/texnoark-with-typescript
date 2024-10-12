import { createRoot } from "react-dom/client";
import Router from "./routes";
import { ConfigProvider } from "antd";
import "./index.css";

createRoot(document.getElementById("root")!).render(
   <ConfigProvider
      theme={{
         token: {
            colorPrimary: "#e99803",
         },
      }}
   >
      <Router />
   </ConfigProvider>
);
