import { AiOutlineArrowRight } from "react-icons/ai";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { category } from "@service";
import { Category } from "@modals";
import { GlobalTable, Popconfirm, GlobalSearch } from "@components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { Record, Update, Pagination } from "@types";
const initialValue = { id: 0, name: "", categoryId: 0, category_id: 0 };

const Index = () => {
   const [total, setTotal] = useState();
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const { search } = useLocation();
   const navigate = useNavigate();
   const [update, setUpdate] = useState<Update>(initialValue);

   const [params, setParams] = useState({
      page: 1,
      limit: 5,
      search: "",
   });

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
      const response = await category.get(params);
      if (response.status === 200) {
         setTotal(response.data?.data?.count);
         setData(response.data?.data?.categories);
      }
   };
   useEffect(() => {
      getData();
   }, [params]);

   const deleteCategory = async (id: number) => {
      try {
         const response = await category.delete(id);
         if (response.status === 200) {
            getData();

         }
      } catch (error) {
         console.log(error);
      }
   };
   const updateDate = (data: Record) => {
      setUpdate(data);
      openModal();
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
            onClick: () => navigate(`/admin-layout/category/${record.id}`),
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
                  title="Delete category?"
                  description="Are you sure to delete this category?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteCategory(record.id)}
               >
                  <Tooltip title="Delete" color="#e99803">
                     <Button>
                        <DeleteOutlined />
                     </Button>
                  </Tooltip>
               </Popconfirm>
               <Tooltip title="Edit" color="#e99803">
                  <Button onClick={() => updateDate(record)}>
                     <EditOutlined />
                  </Button>
               </Tooltip>
               <Button onClick={() => navigate(`/admin-layout/category/${record.id}`)} ><AiOutlineArrowRight /></Button>
            </div>
         ),
      },
   ];

   return (
      <>
         <Category open={open} handleClose={closeModal} update={update} getData={getData} />
         <div className="flex justify-between mb-10">
            <GlobalSearch placeholder="Search category..." searchParamKey="search" onSearch={handleSearch} />

            <Button type="primary" onClick={openModal} className="rounded-lg px-4 py-5">
               <span className="ml-2">Add New Category</span>
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
