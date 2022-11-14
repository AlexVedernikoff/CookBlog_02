import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

import 'antd/dist/antd.min.css';
import styles from './ArticleController.module.scss';

const ArticleController = ({ controllerFlag }) => {

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const { userData } = useStateUser();

    const { id } = useParams();

    const paramSlug = `/articles/${id}/edit`;

    const controler =
        controllerFlag && userData ? (
            <div className={styles['controller-wrapper']}>
                <Link to={paramSlug}>
                    <button type="button" className={styles['controller-button__edit']}>
                        Редактировать рецерт
                    </button>
                </Link>
            </div>
        ) : null;

    return controler;
};

export { ArticleController };