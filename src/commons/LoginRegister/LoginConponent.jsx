import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Form, Input, Card, Checkbox } from 'antd'
import { apiLoginEmployer } from 'src/apis/apiEndpoint'
import { httpPost } from 'src/apis/apiCaller'
import { useAppDispatch } from 'lib/hooks'
import { updateLoading } from 'lib/features/loadingSlice'
import { setCookie } from 'src/helper/common'
import {
  errorMessage,
  loggedIn,
  refreshToken,
  token,
} from "src/constants/common";
import { setIsLogin } from 'lib/features/userSlice'
import { toast } from 'react-toastify'

export default function LoginConponent() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch();

  const handleLogin = async (userLogin) => {
    dispatch(updateLoading(true));
    try {
      const response = await httpPost(apiLoginEmployer, userLogin);
      if (response?.status === 200) {
        setCookie(token, response?.tokenLogin?.token);
        setCookie(refreshToken, response?.tokenLogin?.refreshToken);
        setCookie(loggedIn, true);

        dispatch(setIsLogin(true));
        window.location.href = "/";
      } else {
        toast.error(response?.messages[0] || errorMessage);
      }
    } catch (error) {
      console.error("errorLogin", error);
      toast.error(errorMessage);
    } finally {
      dispatch(updateLoading(false));
    }
  }

  return (
    <div>
      <section className="flex justify-center items-center">
        <div className="container px-6 py-12 h-full ">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="">
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                alt="Phone image"
                width={800}
                height={800}
              />
            </div>
            <div className="grow">
              <Card
                className='border  p-3 tablet:p-0 card-login'
                title={
                  <div className="flex justify-between">
                    <Image
                      src={"/images/Hilead logo be.png"}
                      alt="logo"
                      width={112}
                      height={41}
                    />
                    <div>Đăng nhập</div>
                  </div>
                }
              >
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  autoComplete="off"
                  className="w-full"
                  layout="vertical"
                  requiredMark={false}
                >
                  <Form.Item
                    label="Tên đăng nhập"
                    name="email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                      {
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Tên đăng nhập không hợp lệ'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input size="large" className="w-full" />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                  <Form.Item><div className='w-full flex justify-between'><Checkbox>Lưu tài khoản</Checkbox> <div className="hover:underline cursor-pointer text-sky-500">Quên mật khẩu?</div></div></Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full rounded-3xl"
                      size="large"
                      loading={isLoading}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
