import { Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GlobalTable, Popconfirm, GlobalSearch } from "@components"; import { useEffect, useState } from "react";
import { brands, category } from "@service";
import { useLocation, useNavigate } from "react-router-dom";
import { Brands } from "@modals";
import { Record, Update, Pagination } from "@types";
const initialValue = {
   id: 0,
   name: "",
   description: "",
   categoryId: 0,
   category_id: 0,
};

const Index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const navigate = useNavigate();
   const [total, setTotal] = useState();
   const [categories, setCategories] = useState([]);
   const [update, setUpdate] = useState<Update>(initialValue);
   const [params, setParams] = useState({
      search: "",
      limit: 5,
      page: 1,
   });
   const { search } = useLocation();

   useEffect(() => {
      const params = new URLSearchParams(search);
      const page = Number(params.get("page")) || 1;
      const limit = Number(params.get("limit")) || 5;
      const search_val = params.get("search") || "";
      setParams((prev) => ({
         ...prev,
         search: search_val,
         page: page,
         limit: limit,
      }));
   }, [search]);

   const closeModal = () => {
      setOpen(false);
      setUpdate(initialValue);
   };
   const openModal = () => {
      setOpen(true);
   };

   const getData = async () => {
      const res = await brands.get(params);
      if (res.status === 200) {
         setData(res.data?.data?.brands);
         setTotal(res.data?.data?.count);
      }
   };

   useEffect(() => {
      getData();
      getCategory();
   }, [params]);


   const deleteData = async (id: number) => {
      try {
         const res = await brands.delete(id);
         if (res.status === 200) {
            getData();
         }
      } catch (error) {

         console.log(error);
      }
   };


   const getCategory = async () => {
      const response = await category.get({});
      if (response.status === 200) {
         setCategories(response?.data?.data?.categories);
      }
   };
   const editData = (data: Record) => {
      setUpdate(data);
      openModal();
   };
   const handleSearch = (value: string) => {
      setParams((prev) => ({
         ...prev,
         search: value,
      }));
   };


   const handleTableChange = (pagination: Pagination) => {
      const { current, pageSize } = pagination;
      setParams((prev) => ({
         ...prev,
         page: current,
         limit: pageSize,
      }));
      const current_params = new URLSearchParams(search);
      current_params.set("page", `${current}`);
      current_params.set("limit", `${pageSize}`);
      navigate(`?${current_params}`);
   };

   const columns = [
      {
         title: "T/r",
         dataIndex: "tr",
         key: "tr",
         render: (_: string, __: Record, index: number) =>
            (params.page - 1) * params.limit + index + 1,
      },
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Decription",
         dataIndex: "description",
         key: "description",
      },

      {
         title: "Action",
         dataIndex: "action",
         key: "action",
         render: (_: string, record: Record) => (
            <div className="flex gap-6">
               <Popconfirm
                  title="Delete brand?"
                  description="Are you sure to delete this brand?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteData(record.id)}
               >
                  <Tooltip title="Delete" color="#e99803">
                     <Button>
                        <DeleteOutlined />
                     </Button>
                  </Tooltip>
               </Popconfirm>
               <Tooltip title="Edit" color="#e99803">
                  <Button onClick={() => editData(record)}>
                     <EditOutlined />
                  </Button>
               </Tooltip>
            </div>
         ),
      },
   ];

   return (
      <>
         <Brands open={open} handleClose={closeModal} update={update} getData={getData} categories={categories} />
         <div className="flex justify-between mb-10">
            <GlobalSearch placeholder="Search Brands..." searchParamKey="search" onSearch={handleSearch} />
            <Button type="primary" onClick={openModal} className="rounded-lg px-4 py-5" >
               <span className="ml-2">Add New Brands</span>
            </Button>
         </div>

         <GlobalTable
            columns={columns}
            dataSource={data}
            pagination={{
               current: params.page,
               pageSize: params.limit,
               total: total,
               showSizeChanger: true,
               pageSizeOptions: [3, 5, 10, 20],
            }}
            handleChange={handleTableChange}
         />
      </>
   );
};

export default Index;
