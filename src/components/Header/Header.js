import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss';

import LoggedIn from './LoggedIn';

function Header() {

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { userData } = useStateUser();

    return (
        <>
            {
                userData
                    ? <LoggedIn />
                    : <div>
                        <Link to="/sign-in" className='btn_group'>Sign In</Link>
                        <Link to="/sign-up" className='btn_group'>Sign Up</Link>
                    </div>
            }
        </>
    );
};

export default Header;