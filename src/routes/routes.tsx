import { FiSettings } from "react-icons/fi";
import { AiOutlineStock } from "react-icons/ai";
import { BiSpreadsheet } from "react-icons/bi";
import { TbBrand4Chan } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const admin = [
   {
      content: "Products",
      path: "/admin-layout/",
      icon: <MdOutlineAdminPanelSettings />
   },
   {
      content: "Category",
      path: "/admin-layout/category",
      icon: <BiCategoryAlt />,
   },
   {
      content: "Brands",
      path: "/admin-layout/brands",
      icon: <TbBrand4Chan />,
   },
   {
      content: "Brand category",
      path: "/admin-layout/brand-category",
      icon: <TbBrand4Chan />
   },
   {
      content: "Ads",
      path: "/admin-layout/ads",
      icon: <BiSpreadsheet />,
   },
   {
      content: "Stocks",
      path: "/admin-layout/stocks",
      icon: <AiOutlineStock />,
   },
   {
      content: "Settings",
      path: "/admin-layout/settings",
      icon: <FiSettings />,
   },
];

export { admin };
