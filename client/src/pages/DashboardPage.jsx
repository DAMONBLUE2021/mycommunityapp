
import { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';

const DashboardPage = () => {
  const [services, setServices] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const [servicesRes, myServicesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/services', config),
          axios.get('http://localhost:5000/api/users/me/services', config)
        ]);
        
        setServices(servicesRes.data);
        setMyServices(myServicesRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVolunteer = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/services/${serviceId}/volunteer`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update the myServices state
      const updatedService = services.find(service => service._id === serviceId);
      setMyServices([...myServices, updatedService]);
    } catch (err) {
      setError('Failed to volunteer for this service');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>My Volunteering Activities</h3>
        {myServices.length === 0 ? (
          <p>You haven't volunteered for any services yet.</p>
        ) : (
          myServices.map(service => (
            <div key={service._id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '5px', 
              padding: '1rem', 
              margin: '1rem 0',
              backgroundColor: '#f0f8ff'
            }}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Location:</strong> {service.location}</p>
              <p><strong>Date:</strong> {service.date}</p>
              <span style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}>
                Volunteered
              </span>
            </div>
          ))
        )}
      </div>
      
      <div>
        <h3>Available Volunteering Opportunities</h3>
        {services.filter(service => !myServices.some(myService => myService._id === service._id))
          .map(service => (
            <ServiceCard 
              key={service._id} 
              service={service} 
              onVolunteer={handleVolunteer}
            />
          ))
        }
      </div>
    </div>
  );
};

export default DashboardPage;