import { Input } from 'antd';

import classes from './SearchRecipes.module.scss';

const SearchRecipes = () => {
    return <Input placeholder="Type to search" className={classes['search']}/>;
};

export default SearchRecipes;