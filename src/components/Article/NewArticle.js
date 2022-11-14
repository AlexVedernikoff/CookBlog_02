import { Form, Input, Button, Select, } from 'antd';
import React, { useEffect, useState } from 'react';

import classes from './NewArticle.module.scss';

function NewArticle({ title, transferData, articleTitle, description, articleBody, ingredients }) {

    const newFilds = [
        {
            name: ['title'],
            value: articleTitle || null,
        },
        {
            name: ['description'],
            value: description || null,
        },
        {
            name: ['body'],
            value: articleBody || null,
        },
        {
            name: ['ingredients'],
            value: ingredients && ingredients.length ? ingredients : [''],
        },
    ];

    const [fields, setFields] = useState(newFilds);

    useEffect(() => {
        setFields(newFilds);
    }, [title, description, articleTitle, articleBody, ingredients]);

    return (
        <div className={classes['list__wrapper']}>
            <Form
                name="dynamic_form_item"
                layout="vertical"
                size="large"
                className={classes['ant-form-article']}
                onFinish={transferData}
                fields={fields}
            >
                <div className={classes['form-title']}>
                    <span>{title}</span>
                </div>
                <Form.Item
                    className={classes['form-item']}
                    name="title"
                    label="Наименование рецепта"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Title" className={classes['ant-input']} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                >
                    <Input type="text" placeholder="Short description" className={classes['ant-input']} />
                </Form.Item>

                <Form.Item
                    className={classes['ant-form-item']}
                    name="body"
                    label="Порядок приготовления"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea type="text" placeholder="Text" className={classes['ant-input-text-area']} />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Фото блюда (url)"
                    rules={[
                        {
                            type: 'url',
                            warningOnly: true,
                        },
                    ]}
                >
                    <Input placeholder="Dish image" />
                </Form.Item>

                <Form.Item
                    name="difficulty"
                    label="Сложность приготовления"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="Легкий">Легкий</Select.Option>
                        <Select.Option value="Сложный">Сложный</Select.Option>
                    </Select>
                </Form.Item>

                <div className={classes['form-item-list__wrapper']}>
                    <Form.List
                        name="ingredients"
                        label="Ингредиенты"
                    >
                        {(fieldsList, { add, remove }) => (
                            <>
                                {fieldsList.map((field, index) => (
                                    <Form.Item
                                        label={index === 0 ? 'Игредиенты' : ''}
                                        className={classes['ant-form-item']}
                                        key={field.key}>
                                        <Form.Item {...field} noStyle
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}>
                                            <Input placeholder="Ingredient" style={{ width: '40%' }}
                                            />
                                        </Form.Item>

                                        {fieldsList.length > 1 ? (
                                            <Button
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                                className={classes['form-item-list__del-button']}
                                            >
                                                Delete
                                            </Button>
                                        ) : null}
                                    </Form.Item>
                                ))}

                                <Form.Item className={classes['form-item-list__add-button']}>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item className='ant-form-item'>
                        <Button type="primary" htmlType="submit" className={classes['form-item-list__send-button']}>
                            Send
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default NewArticle;