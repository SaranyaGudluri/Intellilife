import React from 'react';
import MealPlannerCard from '../_components/MealPlannerCard';

function MealPlanner() {
  return (
    <main className='p-8 mx-auto max-w-7xl'>
      <div className='flex items-center'>
        <h2 className='mr-2 text-3xl font-bold tracking-tight'>Meal Planner Dashboard</h2>
      </div>
      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <MealPlannerCard />
      </div>
    </main>
  );
}

export default MealPlanner;