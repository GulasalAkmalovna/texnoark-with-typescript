import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { brands } from "@service";
import { PropsModals, IBrandValues } from "@types";

const Index = ({
   open,
   handleClose,
   getData,
   update,
   categories,
}: PropsModals) => {
   const [form] = Form.useForm();
   const [file, setFile] = useState<string | File>("");

   useEffect(() => {
      if (update?.id) {
         form.setFieldsValue({
            name: update.name,
            description: update.description,
            categoryId: update.category_id,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   const handleChange = (e: any) => {
      let fileData = e.target.files[0];
      setFile(fileData);
   };

   const handleSubmit = async (values: IBrandValues) => {
      const formData: any = new FormData();
      formData.append("name", values.name);
      formData.append("categoryId", values.categoryId);
      formData.append("description", values.description);
      if (file) {
         formData.append("file", file);
      }
      if (update?.id) {
         try {
            const res = await brands.update(update.id, values);
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         try {
            const response = await brands.create(formData);
            if (response.status === 201) {
               handleClose();
               getData();
               form.resetFields();
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <>
         <Modal
            open={open}
            title={update?.id ? "Update brand" : "Add brand"}
            onCancel={handleClose}
            width={500}
            footer={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     gap: "10px",
                  }}
               >
                  <Button type="primary" form="basic" htmlType="submit"> {update?.id ? "Update" : "Submit"}  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            }
         >
            <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
               <Form.Item
                  label="Brand name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input brand name!",
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Category"
                  name="categoryId"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please select category!",
                     },
                  ]}
               >
                  <Select placeholder="Select a Category">
                     {categories?.map((item, index) => (
                        <Select.Option value={item.id} key={index}>
                           {item.name}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
               <Form.Item
                  label="Description"
                  name="description"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input description!",
                     },
                  ]}
               >
                  <Input.TextArea allowClear />
               </Form.Item>
               {!update.id && (
                  <Form.Item
                     label="Brand logo"
                     name="file"
                     labelCol={{ span: 24 }}
                     wrapperCol={{ span: 24 }}
                     rules={[
                        {
                           required: true,
                           message: "Please upload brand logo!",
                        },
                     ]}
                  >
                     <Input type="file" onChange={handleChange} />
                  </Form.Item>
               )}
            </Form>
         </Modal>
      </>
   );
};

export default Index;
