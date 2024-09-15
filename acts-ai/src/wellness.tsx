import React from 'react';

const WellnessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Wellness Advice</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Showing Gratitude</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Start each day by thinking of three things you're grateful for</li>
          <li>Keep a gratitude journal and write in it regularly</li>
          <li>Express appreciation to others for their kindness or help</li>
          <li>Practice mindful gratitude by savoring positive moments</li>
        </ul>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Taking Care of Your Health</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Get regular exercise - aim for at least 30 minutes a day</li>
          <li>Maintain a balanced diet rich in fruits, vegetables, and whole grains</li>
          <li>Ensure you get 7-9 hours of quality sleep each night</li>
          <li>Stay hydrated by drinking plenty of water throughout the day</li>
          <li>Practice stress-reduction techniques like meditation or deep breathing</li>
        </ul>
      </section>
      
      <div className="bg-muted p-6 rounded-lg">
        <p className="text-muted-foreground italic">
          "The greatest wealth is health." - Virgil
        </p>
      </div>
    </div>
  );
};

export default WellnessPage;