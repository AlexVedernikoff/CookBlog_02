import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';
import { TailSpin } from 'react-loader-spinner';

import { ArticleController } from '../../ArticleController/ArticleController';

import classes from './PostFull.module.scss';

export const PostFull = ({ itemId }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [controllerShow, setControllerShow] = useState(false);
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { userData, posts } = useStateUser();

    useEffect(() => {
        postsUpdate();
    }, []);

    const postsUpdate = async () => {
        try {
            setLoading(true);
            if (userData) {
                setControllerShow(true);
            }
            setLoading(false);
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    };

    const receiptCard = posts.filter((el) => {
        return el.elId == itemId.id;
    })[0];

    return (
        <div className={classes['wrapper']}>
            {error ? (
                <Alert
                    className="alert"
                    message="Something has gone wrong"
                    type="error"
                    showIcon
                />
            ) : null}
            {!loading ? (
                <>
                    <div className={classes['image-container']}>
                        <img src={receiptCard.image} alt="" />
                    </div>

                    <div className={classes['text-container']}>
                        <div className={classes['title']}>
                            <h1>{receiptCard.name}</h1>
                        </div>
                        <div className={classes['ingredients']}>
                            <div className={classes['ingredients-left']}>
                                краткое описание
                            </div>
                            <div className={classes['ingredients-right']}>
                                {receiptCard.description}
                            </div>
                        </div>
                        <div className={classes['ingredients']}>
                            <div className={classes['ingredients-left']}>ингредиенты</div>
                            <div className={classes['ingredients-right']}>
                                {receiptCard.ingredients}
                            </div>
                        </div>
                        <div className={classes['ingredients']}>
                            <div className={classes['ingredients-left']}>
                                процесс приготовления
                            </div>
                            <div className={classes['ingredients-right']}>
                                {receiptCard.body}
                            </div>
                        </div>
                        <div className={classes['footer']}>
                            <div>Оценили {receiptCard.likes}</div>
                            <div> {receiptCard.difficulty}</div>
                            <div>
                                <ArticleController
                                    controllerFlag={controllerShow}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : <TailSpin color="#00BFFF" height={80} width={80} />}
        </div>
    );
};