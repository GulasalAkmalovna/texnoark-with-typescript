import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import GlobalImg from "../../assets/sign-in.jpg";
import { auth } from "@service";
import { openNotification } from "@utils";
import { ISignIn } from "@types";

const Index = () => {
   const navigate = useNavigate();

   const handleSubmitForm = async (values: ISignIn) => {
      try {
         const response = await auth.sign_in(values);
         let access_token = response?.data?.data.tokens.access_token;
         let userId = response?.data?.data?.data?.id;
         localStorage.setItem("access_token", access_token);
         localStorage.setItem("userId", userId);
         if (response.status === 201) {
            openNotification({
               type: "success",
               message: "Succesfulled Logged",
               description: "Congratulations successfully logged in!",
            });
            navigate("/admin-layout");
         }
      } catch (error: any) {
         console.log(error)
      }
   };

   return (
      <section className="w-full min-h-[100vh] bg-[#f7f7f0]">
         <div className="w-[100%] h-[100vh] flex  container m-auto">
            <div className=" w-full flex justify-center items-center">
               <img className="w-50" src={GlobalImg} alt="sign-in" />
            </div>
            <div className="w-[50%] flex justify-center items-center">
               <div>
                  <h1 className="text-3xl font-semibold mb-4  text-[#e99803]"> Sign In </h1>
                  <Form className="w-[350px]" name="basic" onFinish={handleSubmitForm}>
                     <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your phone number!",
                           },
                        ]}
                     >
                        <Input className="py-[12px]" allowClear />
                     </Form.Item>

                     <Form.Item
                        label="Password"
                        name="password"
                        labelCol={{
                           span: 24,
                        }}
                        wrapperCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your password!",
                           },
                        ]}
                     >
                        <Input.Password className="py-[12px]" allowClear showCount />
                     </Form.Item>

                     <Form.Item
                        wrapperCol={{
                           span: 24,
                        }}
                     >
                        <Button type="primary" htmlType="submit" className="w-full mt-0" size="large" >  Submit </Button>
                     </Form.Item>
                     <div className="flex justify-between items-center">
                        <p className="text-sm text-black"> Don't have an account? </p>
                        <Link to="/sign-up" className={"text-[#e99803] font-[500] text-[18px]"}  > Register </Link>
                     </div>
                  </Form>
               </div>
            </div>
         </div>
      </section>

   );
};

export default Index;
