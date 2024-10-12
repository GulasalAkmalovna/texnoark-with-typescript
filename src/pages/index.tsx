import { lazy } from 'react'

const SignIn = lazy(() => import("./sign-in"))
const SignUp = lazy(() => import("./sign-up"))
const AdminLayout = lazy(() => import("./admin-layout"))
const Products = lazy(() => import("./products"))
const Category = lazy(() => import("./category"))
const SubCategory = lazy(() => import("./sub-category"))
const Brands = lazy(() => import("./brands"))
const BrandCategory = lazy(() => import("./brand-category/"))
const Ads = lazy(() => import("./ads"))
const Stock = lazy(() => import("./stock"))
const Settings = lazy(() => import("./settings"))
export {
   SignIn,
   SignUp,
   AdminLayout,
   Products,
   Category,
   SubCategory,
   Brands,
   BrandCategory,
   Ads,
   Stock,
   Settings
};
