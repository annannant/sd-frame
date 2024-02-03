import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input, Modal } from 'antd'

import { postLogin } from 'api/auth'
import useMessage from 'hooks/useMessage'

export const LoginComponent = () => {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['user'])
  const [loading, setLoading] = useState(false)
  // const [modal, contextHolderModal] = Modal.useModal()
  const { contextHolder, success, error } = useMessage()

  const redirect = (role: string) => {
    switch (role) {
      case 'admin':
        navigate('/production-orders')
        break
      case 'salesman':
        navigate('/production-orders')
        break
      case 'production':
        navigate('/production-orders/waiting')
        break
      case 'warehouse':
        navigate('/standard-frames')
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (cookies.user) {
      redirect(cookies.user.data.role)
    }
    console.log('cookies:', cookies.user)
  }, [])

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const user = await postLogin({
        username: values.username,
        password: values.password,
      })
      setCookie('user', user, { path: '/' })
      redirect(user.data.role)
    } catch (e) {
      error()
      console.log('e:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <Card title="เข้าสู่ระบบ" className="mx-auto mt-[60px] w-[400px]">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          disabled={loading}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="ชื่อผู้ใช้งาน"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="รหัสผ่าน"
            />
          </Form.Item>
          {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button mt-3 w-full"
              loading={loading}
            >
              เข้าสู่ระบบ
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
