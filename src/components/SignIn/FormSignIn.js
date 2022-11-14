import { Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';

import classes from './FormSignIn.module.scss';
function FormSignIn({ userLogin }) {
    return (
        <div className='form-sign'>
            <Form
                layout="vertical"
                name="normal_login"
                size="large"
                className={classes['ant-form']}
                initialValues={{
                    remember: true,
                }}
                onFinish={(val) => {
                    userLogin(val);
                }}
            >
                <div className='form-title'>
                    <span>Sign In</span>
                </div>

                <Form.Item
                    className='ant-form-item'
                    label="Email address"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="Email address" className='ant-input' />
                </Form.Item>
                <Form.Item
                    className={classes['ant-form-item']}
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password type="password" placeholder="Password" className={classes['ant-form-item-control-input-content']} />
                </Form.Item>

                <Form.Item className='ant-form-item-control-input-content '>
                    <Button type="primary" htmlType="submit" className='login-form-button'>
                        Login
                    </Button>
                    <span className='input-content'>
                        Don’t have an account? <Link to="/sign-up" style={{ color: '#1890FF', textDecoration: 'none' }}>Sign Up</Link>.
                    </span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormSignIn;