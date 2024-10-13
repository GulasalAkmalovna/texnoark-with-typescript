import { Button, Tooltip } from "antd";
import { Record, Pagination } from "@types";
import { useEffect, useState } from "react";
import { products } from "@service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalTable, Popconfirm, GlobalSearch } from "@components";


const Index = () => {
   const [data, setData] = useState([]);
   const { search } = useLocation();
   const navigate = useNavigate();
   const [total, setTotal] = useState();
   const [params, setParams] = useState({
      page: 1,
      limit: 5,
      search: "",
   });



   const getData = async () => {
      const response = await products.get(params);
      if (response.status === 200) {
         setTotal(response.data?.data?.count);
         console.log(response);
         setData(response.data?.data?.products);
      }
   };
   useEffect(() => {
      getData();
   }, [params]);

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


   // Datalarini delete qilsh
   const deleteData = async (id: number) => {
      console.log(id)
      try {
         const response = await products.delete(id);
         if (response.status === 200) {
            getData();
         }
      } catch (error) {

         console.log(error);
      }
   };

   // search uchun funksiya
   const handleSearch = (value: string) => {
      setParams((prev) => ({
         ...prev,
         search: value,
      }));
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
         onCell: (record: Record) => ({
            onClick: () =>
               navigate(`/admin-layout/product-details/${record.id}`),
            style: { cursor: "pointer" },
         }),
      },
      {
         title: "Action",
         dataIndex: "action",
         key: "action",
         render: (_: string, record: Record) => (
            <div className="flex gap-6">
               <Popconfirm
                  title="Delete product?"
                  description="Are you sure to delete this product?"
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
                  <Button >
                     <EditOutlined />
                  </Button>
               </Tooltip>
            </div>
         ),
      },
   ];

   return (
      <>
         <div className="flex justify-between mb-10">
            <GlobalSearch placeholder="Search..." searchParamKey="search" onSearch={handleSearch} />
            <Button type="primary" >
               <span >Add Product</span>
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
