import { Link } from 'react-router-dom';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome to Community Services</h1>
      <p>Join us in making our community a better place through volunteering!</p>
      
      {!isLoggedIn && (
        <div style={{ marginTop: '2rem' }}>
          <p>Please login or signup to view available volunteering opportunities.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/login">
              <button style={{ 
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button style={{ 
                padding: '0.5rem 1rem',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Signup
              </button>
            </Link>
          </div>
        </div>
      )}
      
      {isLoggedIn && (
        <div style={{ marginTop: '2rem' }}>
          <p>View available volunteering opportunities on your dashboard.</p>
          <Link to="/dashboard">
            <button style={{ 
              padding: '0.5rem 1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>
              Go to Dashboard
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
