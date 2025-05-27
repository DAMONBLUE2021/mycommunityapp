const ServiceCard = ({ service, onVolunteer }) => {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '5px', 
        padding: '1rem', 
        margin: '1rem 0',
        backgroundColor: '#fff'
      }}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <p><strong>Location:</strong> {service.location}</p>
        <p><strong>Date:</strong> {service.date}</p>
        <button 
          onClick={() => onVolunteer(service._id)}
          style={{ 
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Volunteer
        </button>
      </div>
    );
  };
  
  export default ServiceCard;
  