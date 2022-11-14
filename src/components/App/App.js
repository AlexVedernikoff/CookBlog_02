import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditArticle from '../Article/EditArticle';
import { PostFull } from '../Post/PostFull/PostFull';
import SearchRecipes from '../Search/SearchRecipes';
import FilterRecipes from '../Filters/FilterRecipes';
import './App.scss';
import { PostsList } from '../Post/PostList/PostsList';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import { baseRoute, articleRoute, signInRoute, signUpRoute, newArticleRoute, idRoute, editRoute } from '../../constants';
import CreateArticle from '../Article/CreateArticle';
import SortRecipes from '../Sort/SortRecipes';

function App() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { userData } = useStateUser();

    return (
        <Router>
            <div className="app">
                <header className="app_header">
                    <Link to='/' className='header_name'> CookBook </Link>
                    <Header />
                </header>
                <main className='app_main'>
                    <Route path={baseRoute} exact render={() => <Redirect to='/articles' />} />
                    <Route path={articleRoute} render={() =>
                        <>
                            <SearchRecipes />
                            <FilterRecipes />
                            <SortRecipes />
                            <PostsList />
                        </>}
                    exact />
                    <Route
                        path={`${articleRoute}${idRoute}`}
                        exact
                        render={({ match }) => {
                            const id = match.params;
                            return <PostFull itemId={id} />;
                        }}
                    />
                    <Route path={signInRoute} component={SignIn} exact />
                    <Route path={signUpRoute} component={SignUp} exact />
                    <Route path={newArticleRoute} exact>{userData ? <CreateArticle /> : <Redirect to={'/sign-in'} />} </Route>
                    <Route path={`${articleRoute}${idRoute}${editRoute}`} exact >{userData ? <EditArticle /> : <Redirect to={'/sign-in'} />} </Route>
                </main>
            </div>
        </Router>
    );
}

export default App;
