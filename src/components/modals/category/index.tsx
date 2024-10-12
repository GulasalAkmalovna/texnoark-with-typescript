import { useEffect } from "react";
import { Button, Modal, Form, Input } from "antd";
import { category } from "@service";
import { PropsModals } from "@types";

const Index = ({ open, handleClose, getData, update }: PropsModals) => {
   const [form] = Form.useForm();

   const handleSubmit = async (values: string) => {
      if (update?.id) {
         try {
            const response = await category.update(update.id, values);
            if (response.status === 200) {
               handleClose();
               getData();
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         try {
            const response = await category.create(values);
            if (response.status === 201) {
               handleClose();
               getData();
               form.resetFields();
            }
         } catch (error) {
            console.log(error)
         }
      }
   };

   useEffect(() => {
      if (update?.id) {
         form.setFieldsValue({
            name: update.name,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   return (
      <>
         <Modal
            open={open}
            title={update?.id ? "Update category" : "Add category"}
            onCancel={handleClose}
            width={500}
            footer={
               <div style={{ display: "flex", justifyContent: "flex-start", gap: "12px", }} >
                  <Button type="primary" form="basic" htmlType="submit"> {update?.id ? "Update" : "Submit"} </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            }
         >
            <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
               <Form.Item
                  label="Category name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Input category name!",
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default Index;
