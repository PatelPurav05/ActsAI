import React from 'react';

const EmergencyContact: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Emergency Contact</h1>
      

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Reach Out</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>If you're having thoughts of self-harm</li>
          <li>Please reach out for help immediately</li>
          <li>You're not alone. Professional help is available 24/7</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Emergency Contacts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>National Suicide Prevention Lifeline: <a href="tel:1-800-273-8255" className="text-primary hover:underline">1-800-273-8255</a></li>
          <li>Crisis Text Line: Text HOME to <span className="font-semibold">741741</span></li>
          <li>Emergency Services: <a href="tel:911" className="text-primary hover:underline">911</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Online Resources</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email Support: <a href="mailto:support@acts.ai" className="text-primary hover:underline">support@acts.ai</a></li>
          <li>Online Chat: <a href="#" className="text-primary hover:underline">www.acts.ai/chat</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Seeking Professional Help</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We strongly encourage you to seek professional help if you're experiencing mental health challenges</li>
          <li>A mental health professional can provide personalized support and treatment options</li>
          <li>Remember, reaching out for help is a sign of strength, not weakness. Your well-being is important, and there are people ready to support you through difficult times.</li>
        </ul>
      </section>

    </div>
  );
};

export default EmergencyContact;