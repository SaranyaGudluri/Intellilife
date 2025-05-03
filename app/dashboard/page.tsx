// "use client"
// import React, { useState } from 'react'
// import SearchSection from './_components/SearchSection'
// import TemplateListSection from './_components/TemplateListSection'
// function Dashboard() {
  
// }

// export default Dashboard

// "use client"
// import React, { useState } from 'react'
// import './_components/styles.css'

// function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-content">
//         <h1 className="app-name">IntelliLife</h1>
//         <p className="app-description">An AI-Powered Personalized Lifestyle Management System</p>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

"use client"
import React, { useState, useEffect } from 'react'

const affirmations = [
  "You are capable of amazing things.",
  "Every day, you're becoming a better version of yourself.",
  "Your potential is limitless.",
  "Challenges are opportunities for growth.",
  "You have the strength to overcome any obstacle.",
  "Your mind is powerful and your spirit is resilient.",
  "Today is full of possibilities.",
  "You are worthy of success and happiness."
];

function Dashboard() {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentAffirmation(
      affirmations[Math.floor(Math.random() * affirmations.length)]
    );
  }, []);

  const changeAffirmation = () => {
    setCurrentAffirmation(
      affirmations[Math.floor(Math.random() * affirmations.length)]
    );
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#3bb6bf]/10 to-[#3bb6bf]/20 flex flex-col">

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl space-y-6 border border-[#3bb6bf]/20">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Life Balance Sections */}
            {[
              { name: "Wellness", icon: "🌿", description: "Nurture your physical and mental health" },
              { name: "Balance", icon: "⚖️", description: "Align your personal and professional life" },
              { name: "Growth", icon: "🌱", description: "Continuous learning and self-improvement" }
            ].map((item) => (
              <div 
                key={item.name} 
                className="bg-[#3bb6bf]/10 rounded-xl p-6 text-center hover:bg-[#3bb6bf]/20 transition-colors"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{color: '#3bb6bf'}}>{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Affirmation Section */}
          <div className="mt-6 bg-[#3bb6bf]/10 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#3bb6bf'}}>
              Daily Affirmation
            </h2>
            <p className="text-lg text-gray-700 mb-4 min-h-[60px]">
              {isClient ? currentAffirmation : affirmations[0]}
            </p>
            {isClient && (
              <button 
                onClick={changeAffirmation}
                className="px-4 py-2 rounded-full hover:bg-[#3bb6bf]/20 transition-colors"
                style={{
                  border: `2px solid #3bb6bf`,
                  color: '#3bb6bf'
                }}
              >
                New Affirmation
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer
      <footer className="w-full p-4 text-center">
        <p className="text-[#3bb6bf]/70">© 2024 IntelliLife. All rights reserved.</p>
      </footer> */}
    </div>
  )
}

export default Dashboard