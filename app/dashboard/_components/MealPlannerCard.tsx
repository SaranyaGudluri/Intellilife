// // MealPlannerCard.tsx
// "use client";
// import './styles.css';
// import { chatSession } from '@/utils/AiModel';
// import React, { useState } from 'react';

// function MealPlannerCard() {
//   const [formData, setFormData] = useState({
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     targetWeight: '',
//     diet: 'Veg',
//   });
//   const [loading, setLoading] = useState(false);
//   const [mealPlan, setMealPlan] = useState<any[]>([]);

//   const genders = ['Male', 'Female', 'Other'];
//   const diets = ['Veg', 'Non-Veg', 'Vegan'];

//   const generateMealPlan = async () => {
//     setLoading(true);
//     const prompt = `Generate a personalized meal plan for a ${formData.gender}, age ${formData.age}, height ${formData.height} cm, weight ${formData.weight} kg, with a target weight of ${formData.targetWeight || 'maintain current weight'} and a ${formData.diet} diet. 
//     The meal plan should include breakfast, lunch, dinner, and snacks, with a focus on balanced nutrition for one day. Give the output in sections using bold side headings and bullet points.`;

//     try {
//       const result = await chatSession.sendMessage(prompt);
//       const mealContent = await result?.response.text();
//       const meals = mealContent.split('\n').map((line: string) => line.trim()).filter(Boolean);
//       setMealPlan(meals);
//     } catch (error) {
//       console.error('Error generating meal plan:', error);
//       setMealPlan([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     generateMealPlan();
//   };

//   return (
//     <div className="meal-planner-card">
//       <h2 className="title">Meal Planner</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label className="label">Age</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             className="input"
//           />
//         </div>

//         <div className="form-group">
//           <label className="label">Gender</label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//             className="input"
//           >
//             <option value="" disabled>Select gender</option>
//             {genders.map((gender) => (
//               <option key={gender} value={gender}>
//                 {gender}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="label">Height (cm)</label>
//           <input
//             type="number"
//             name="height"
//             value={formData.height}
//             onChange={handleChange}
//             required
//             className="input"
//           />
//         </div>

//         <div className="form-group">
//           <label className="label">Weight (kg)</label>
//           <input
//             type="number"
//             name="weight"
//             value={formData.weight}
//             onChange={handleChange}
//             required
//             className="input"
//           />
//         </div>

//         <div className="form-group">
//           <label className="label">Target Weight (optional)</label>
//           <input
//             type="number"
//             name="targetWeight"
//             value={formData.targetWeight}
//             onChange={handleChange}
//             className="input"
//           />
//         </div>

//         <div className="form-group">
//           <label className="label">Diet</label>
//           <select
//             name="diet"
//             value={formData.diet}
//             onChange={handleChange}
//             required
//             className="input"
//           >
//             {diets.map((diet) => (
//               <option key={diet} value={diet}>
//                 {diet}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" className="submit-button">
//           {loading ? 'Generating Meal Plan...' : 'Get Meal Plan'}
//         </button>
//       </form>

//       {mealPlan.length > 0 && (
//         <div className="meal-plan">
//           <h3 className="meal-plan-title">Your Meal Plan:</h3>
//           <ul className="meal-list">
//             {mealPlan.map((meal, index) => (
//               <li key={index} className="meal-item">
//                 {meal}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MealPlannerCard;


// //now
// "use client";
// import './styles.css';
// import { chatSession } from '@/utils/AiModel';
// import React, { useState } from 'react';

// function MealPlannerCard() {
//   const [formData, setFormData] = useState({
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     targetWeight: '',
//     diet: 'Veg',
//   });
//   const [loading, setLoading] = useState(false);
//   const [mealPlan, setMealPlan] = useState<any[]>([]);

//   const genders = ['Male', 'Female', 'Other'];
//   const diets = ['Veg', 'Non-Veg', 'Vegan'];

//   const generateMealPlan = async () => {
//     setLoading(true);
//     const prompt = `Generate a personalized meal plan for a ${formData.gender}, age ${formData.age}, height ${formData.height} cm, weight ${formData.weight} kg, with a target weight of ${formData.targetWeight || 'maintain current weight'} and a ${formData.diet} diet. 
//     The meal plan should include food with timings , with a focus on balanced nutrition for one day.`;

//     try {
//       const result = await chatSession.sendMessage(prompt);
//       const mealContent = await result?.response.text();
//       const meals = mealContent.split('\n').map((line: string) => line.trim()).filter(Boolean);
//       setMealPlan(meals);
//     } catch (error) {
//       console.error('Error generating meal plan:', error);
//       setMealPlan([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     generateMealPlan();
//   };

//   return (
//     <div className="meal-planner-card">
//       <h2 className="title">Meal Planner</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label className="label">Age</label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} required className="input" />
//         </div>

//         <div className="form-group">
//           <label className="label">Gender</label>
//           <select name="gender" value={formData.gender} onChange={handleChange} required className="input">
//             <option value="" disabled>Select gender</option>
//             {genders.map((gender) => (
//               <option key={gender} value={gender}>{gender}</option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="label">Height (cm)</label>
//           <input type="number" name="height" value={formData.height} onChange={handleChange} required className="input" />
//         </div>

//         <div className="form-group">
//           <label className="label">Weight (kg)</label>
//           <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className="input" />
//         </div>

//         <div className="form-group">
//           <label className="label">Target Weight (optional)</label>
//           <input type="number" name="targetWeight" value={formData.targetWeight} onChange={handleChange} className="input" />
//         </div>

//         <div className="form-group">
//           <label className="label">Diet</label>
//           <select name="diet" value={formData.diet} onChange={handleChange} required className="input">
//             {diets.map((diet) => (
//               <option key={diet} value={diet}>{diet}</option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" className="submit-button">
//           {loading ? 'Generating Meal Plan...' : 'Get Meal Plan'}
//         </button>
//       </form>

//       {mealPlan.length > 0 && (
//         <div className="meal-plan">
//           <h3 className="meal-plan-title">Your Meal Plan:</h3>
//           <ul className="meal-list">
//             {mealPlan.map((meal, index) => (
//               <li key={index} className="meal-item">{meal}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MealPlannerCard;

"use client";
import "./styles.css";
import { chatSession } from "@/utils/AiModel";
import React, { useState } from "react";

function MealPlannerCard() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    targetWeight: "",
    diet: "Veg",
  });
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any[]>([]);

  const genders = ["Male", "Female", "Other"];
  const diets = ["Veg", "Non-Veg", "Vegan"];

  const generateMealPlan = async () => {
    setLoading(true);
    const prompt = `Generate a personalized meal plan for a ${formData.gender}, age ${formData.age}, height ${formData.height} cm, weight ${formData.weight} kg, with a target weight of ${formData.targetWeight || "maintain current weight"} and a ${formData.diet} diet. 
    The meal plan should include food with timings, with a focus on balanced nutrition for one day. Don't give extra notes.`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const mealContent = await result?.response.text();
      const meals = mealContent
        .split("\n")
        .map((line: string) => line.trim())
        .filter(Boolean);
      setMealPlan(meals);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setMealPlan([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateMealPlan();
  };

  return (
    <div className="meal-planner-card">
      <h2 className="title">Meal Planner</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-columns">
          <div className="form-group">
            <label className="label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="" disabled>
                Select gender
              </option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Target Weight (optional)</label>
            <input
              type="number"
              name="targetWeight"
              value={formData.targetWeight}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Diet</label>
            <select
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              required
              className="input"
            >
              {diets.map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          {loading ? "Generating Meal Plan..." : "Get Meal Plan"}
        </button>
      </form>

      {mealPlan.length > 0 && (
        <div className="meal-plan">
          <h3 className="meal-plan-title">Your Meal Plan:</h3>
          <ul className="meal-list">
            {mealPlan.map((meal, index) => (
              <li key={index} className="meal-item">
                {meal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MealPlannerCard;
