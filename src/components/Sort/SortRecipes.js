import { useDispatch, useSelector } from 'react-redux';

import { sortPosts } from '../../store/userSlice';

import classes from './SortRecipes.module.scss';
const SortRecipes = () => {

    const useStateUser = () => {
        const stateUserst = useSelector(state => state.user);
        return stateUserst;
    };
    const { posts } = useStateUser();
    const dispatch = useDispatch();

    const onSortName = () => {
        dispatch(sortPosts({
            posts: [...posts].sort((prev, next) => {
                if (prev.name < next.name) return -1;
                if (prev.name < next.name) return 1;
            })
        }));
    };

    const onSortPopular = () => {

        // let newArr = [...posts].sort((prev, next) => next.likes - prev.likes);
        // console.log(posts, 'POSTSORT');
        // setPost(newArr);
        dispatch(sortPosts({
            posts: [...posts].sort((prev, next) => next.likes - prev.likes)
        })
        );
    };
    return (
        <>
            <button className={classes['filters']} onClick={onSortName} >
                По названию
            </button>
            <button className={classes['filters']} onClick={onSortPopular} >
                По популярности
            </button>
        </>
    );


};

export default SortRecipes;