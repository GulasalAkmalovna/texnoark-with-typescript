import { useEffect } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { brandCategory } from "@service";
import { PropsModals, IBrandCategoryValues } from "@types";

const Index = ({
   open,
   handleClose,
   getData,
   update,
   brandsData,
}: PropsModals) => {
   const [form] = Form.useForm();

   useEffect(() => {
      if (update?.id) {
         form.setFieldsValue({
            name: update.name,
            brand_id: update.brand_id,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   const handleSubmit = async (values: IBrandCategoryValues) => {
      if (update?.id) {
         try {
            const response = await brandCategory.update(update.id, values);
            if (response.status === 200) {
               handleClose();
               getData();
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         try {
            const response = await brandCategory.create(values);
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
            title={
               update?.id ? "Update brand category" : "Add brand category"
            }
            onCancel={handleClose}
            width={500}
            footer={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     gap: "12px",
                  }}
               >
                  <Button type="primary" form="basic" htmlType="submit"> {update?.id ? "Update" : "Submit"}  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            }
         >
            <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
               <Form.Item
                  label="Brand category name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{
                     required: true,
                     message: "Please input brand category name!",
                  },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Brands"
                  name="brand_id"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please select category!",
                     },
                  ]}
               >
                  <Select placeholder="Select a Brands">
                     {brandsData?.map((item, index) => (
                        <Select.Option value={item.id} key={index}>
                           {item.name}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default Index;
