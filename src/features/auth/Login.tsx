import { Button, Form, Input, notification } from "antd";
import React from "react";
import { authService, LoginDto } from "../../core/api/authService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  AuthContainer,
  AuthContent,
  AuthFooter,
  AuthLayout,
  AuthRegisterInfo,
} from "./styles";
import { set } from "../../core/store/slices/auth/authSlice";
import { Link, useHistory } from "react-router-dom";
import { routes } from "../../core/router/routes";

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginDto>();
  const history = useHistory();

  const submitButtonLayout = {
    wrapperCol: {
      offset: 11,
    },
  };

  const onSubmit = (data: LoginDto) => {
    authService
      .login(data)
      .then((user) => {
        set(user);
        localStorage.setItem("token", user.token);
        notification.success({
          message: `Zalogowano się. Witaj, ${user.login}`,
        });
        history.push(routes.games);
      })
      .catch((err) => {
        notification.error({
          message: `${err}`,
        });
      });
  };

  return (
    <AuthLayout>
      <AuthContainer>
        <AuthContent>
          <Form
            form={form}
            onFinish={onSubmit}
            size="large"
            style={{ backgroundColor: "white" }}
          >
            <Form.Item
              label="Login"
              name="login"
              rules={[
                {
                  required: true,
                  message: "Musisz uzupełnić to pole",
                },
                {
                  min: 6,
                  message: "Login musi mieć co najmniej 6 znaków",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Hasło"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Musisz uzupełnić to pole",
                },
                {
                  min: 6,
                  message: "Hasło musi mieć co najmniej 6 znaków",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item shouldUpdate {...submitButtonLayout}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Zaloguj
                </Button>
              )}
            </Form.Item>
          </Form>
          <AuthRegisterInfo>
            Jeśli nie masz konta,{" "}
            <Link to={routes.register}>zarejestruj się</Link>
          </AuthRegisterInfo>
        </AuthContent>
      </AuthContainer>
      <AuthFooter>Qrnick ©2021 Christ & Kazior & Loniek & Treffon & Trybała</AuthFooter>
    </AuthLayout>
  );
};

export default Login;
