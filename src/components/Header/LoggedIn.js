import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOutUser } from '../../store/userSlice';
import photo from '../../img/photo.png';

function LoggedIn() {
    const dispath = useDispatch();

    const logOut = () => {
        dispath(logOutUser());
    };

    return (
        <div className='header_btn'>
            <Link to="/new-article">
                <button type="button" className='user-data__button'>
                    Create recipe
                </button>
            </Link>
            <div className='user-data__wrapper-inner'>
                <img src={photo} alt="avatar" />
            </div>
            <button className='button-logOut' tabIndex={0} onClick={logOut} onKeyDown={logOut}>Log Out </button>
        </div>
    );
};

export default LoggedIn;