import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalImg from "../../assets/sign-in.jpg";
import { auth } from "@service";
import { openNotification } from "@utils";
import { ISignUp } from "@types";

const Index = () => {
   const navigate = useNavigate();

   const handleSubmitForm = async (values: ISignUp) => {
      try {
         const res = await auth.sign_up(values);
         if (res.status === 201) {
            let access_token = res?.data?.data.tokens.access_token;
            let userId = res?.data?.data?.data?.id;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("userId", userId);
            navigate("/");
            openNotification({
               type: "success",
               message: "Sign up successfully",
               description: "You have successfully signed up",
            });
         }
      } catch (error: any) {
         console.log(error)
      }
   };

   return (
      <section className="w-full min-h-[100vh] bg-[#f7f7f0]">
         <div className="w-[100%] flex container mx-auto">
            <div className="w-[50%] flex justify-center items-center">
               <img src={GlobalImg} alt="sign-up" />
            </div>
            <div className="w-[50%] flex justify-center items-center">
               <div>
                  <h1 className="text-[28px] font-[700] mb-4 text-[#e99803]"> Register </h1>
                  <Form className="w-[400px]" onFinish={handleSubmitForm}>
                     <Form.Item
                        label="FirstName"
                        name="first_name"
                        labelCol={{
                           span: 24,
                        }}
                        rules={[
                           {
                              required: true,
                              message: "Please input your first name!",
                           },
                        ]}
                     >
                        <Input className="py-2" allowClear />
                     </Form.Item>

                     <Form.Item label="LastName" name="last_name"
                        labelCol={{
                           span: 24,
                        }}
                        rules={[
                           { required: true, message: "Please input your last name!", },
                        ]}
                     >
                        <Input className="py-2" allowClear />
                     </Form.Item>

                     <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        labelCol={{
                           span: 24,
                        }}
                        rules={[
                           { required: true, message: "Please input your phone number!", },
                        ]}
                     >
                        <Input className="py-2" allowClear />
                     </Form.Item>

                     <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{
                           span: 24,
                        }}
                        rules={[
                           { required: true, message: "Please input your email!", },
                           {
                              type: "email",
                              message: "Please enter a valid email!",
                           },
                        ]}
                     >
                        <Input className="py-2" allowClear />
                     </Form.Item>

                     <Form.Item
                        label="Password"
                        name="password"
                        labelCol={{
                           span: 24,
                        }}
                        rules={[
                           { required: true, message: "Please input your password!", },
                        ]}
                     >
                        <Input.Password className="py-2" allowClear showCount />
                     </Form.Item>

                     <Form.Item wrapperCol={{ span: 24, }} >
                        <Button type="primary" htmlType="submit" className="w-full mt-" size="large"  >  Submit </Button>
                     </Form.Item>

                     <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500"> Already have an account?</p>
                        <NavLink to="/" className={"text-[#e99803] bold text-lg"}>  Sign In</NavLink>
                     </div>
                  </Form>
               </div>
            </div>
         </div>
      </section>

   );
};

export default Index;
