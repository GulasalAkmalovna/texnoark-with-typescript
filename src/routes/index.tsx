import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import App from "../App";
import { Suspense } from "react";
import {
   SignIn,
   SignUp,
   AdminLayout,
   Products,
   SubCategory,
   Category,
   Brands,
   BrandCategory,
   Ads,
   Stock,
   Settings
} from "@pages";

const Index = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/admin-layout" element={<AdminLayout />}>
               <Route index element={<Products />} />
               <Route path="category" element={<Category />} />
               <Route path="category/:id" element={<SubCategory />} />
               <Route path="brands" element={<Brands />} />
               <Route path="brand-category" element={<BrandCategory />} />
               <Route path="ads" element={<Ads />} />
               <Route path="stocks" element={<Stock />} />
               <Route path="settings" element={<Settings />} />
            </Route>
         </Route>
      )
   );

   return <Suspense fallback={<div>Loading... <div className="loader w-20 h-10 bg-red-600"></div></div>}>
      <RouterProvider router={router} />
   </Suspense>
};

export default Index;
