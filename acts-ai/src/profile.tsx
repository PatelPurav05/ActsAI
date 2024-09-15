import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <p>Name: [User's Name]</p>
        <p>Email: [User's Email]</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Mental Health Journey</h2>
        <p>Progress: [Some metrics or information about the user's progress]</p>
      </section>
      
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Profile;