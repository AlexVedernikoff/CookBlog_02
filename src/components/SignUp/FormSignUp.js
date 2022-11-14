import { Form, Button, Input, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import classes from './FormSignUp.module.scss';

function FormSignUp({ userRegistration }) {
    return (
        <div className='form-sign'>
            <Form
                layout="vertical"
                size="large"
                className={classes['ant-form']}
                initialValues={{
                    remember: true,
                }}
                onFinish={(val) => {
                    userRegistration(val);
                }}
            >
                <div className='form-title'>
                    <span>Create new account</span>
                </div>

                <Form.Item
                    className='ant-form-item'
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Your username must be between 3 and 20 characters long.',
                            min: 3,
                            max: 20,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Username" />
                </Form.Item>

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
                    <Input placeholder="Email address" />
                </Form.Item>

                <Form.Item
                    className='ant-form-item'
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Your password needs to be at least 6 characters.',
                            min: 6,
                            max: 40,
                        },
                    ]}
                >
                    <Input.Password type="password" placeholder="Password" className={classes['ant-form-item-control-input-content']} />
                </Form.Item>

                <Form.Item
                    className='ant-form-item'
                    name="confirm"
                    label="Repeat Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Passwords must match',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Passwords must match'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Password" className={classes['ant-form-item-control-input-content']} />
                </Form.Item>

                <Form.Item
                    className='ant-form-item'
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
                        },
                    ]}
                >
                    <Checkbox>I agree to the processing of my personal information</Checkbox>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" className='login-form-button'>
                        Create
                    </Button>
                    <span className='input-content'>
                        Already have an account? <Link to="/sign-in" style={{ color: '#1890FF', textDecoration: 'none' }}>Sign In</Link>.
                    </span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormSignUp;