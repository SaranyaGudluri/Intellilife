// "use client"
// import React, { useState } from 'react'
// import SearchSection from './_components/SearchSection'
// import TemplateListSection from './_components/TemplateListSection'
// function Dashboard() {
  
// }

// export default Dashboard

"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
import './_components/styles.css'

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="app-name">IntelliLife</h1>
        <p className="app-description">An AI-Powered Personalized Lifestyle Management System</p>
      </div>
    </div>
  )
}

export default Dashboard
