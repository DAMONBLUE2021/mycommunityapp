import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      backgroundColor: '#f0f0f0',
      marginBottom: '1rem'
    }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
          Community Services
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
              Dashboard
            </Link>
            <button onClick={onLogout} style={{ 
              cursor: 'pointer',
              padding: '0.3rem 0.6rem',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
              Login
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', color: '#333' }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
