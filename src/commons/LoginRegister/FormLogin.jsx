import React, { useState } from 'react'

import { notification, Button, Form, Input, Card, Checkbox } from 'antd'
import Image from 'next/image'

function FormLogin() {
  const [isLoading, setIsLoading] = useState(false)


  async function handleLogin(userLogin) {
    // setIsLoading(true)
    // const loginResponse = await login(userLogin.email, userLogin.password)
    // if (loginResponse && loginResponse.success) {
    //   localStorage.setItem('jwtToken', loginResponse.token)
    //   localStorage.setItem('userInfo', JSON.stringify(loginResponse.userInfo))
    //   localStorage.setItem('siteInfo', JSON.stringify(loginResponse.siteModel))
    //   dispatch(clearEntryMessage())
    //   openSuccessNotification('Đăng nhập thành công!')
    //   history.push('/strategy')
    // } else {
    //   openErrorNotification(loginResponse.messages[0])
    // }
    // setIsLoading(false)
  }

  return (
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
  )
}

export default FormLogin
