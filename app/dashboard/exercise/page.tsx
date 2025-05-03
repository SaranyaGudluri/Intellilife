// "use client";
// import { useState } from "react";

// interface PredictionResponse {
//   Exercise: string;
//   "Duration (minutes)": number;
//   "Calories Burned (kcal)": number;
// }

// const exerciseMap: { [key: string]: string } = {
//   "Exercise 1": "Running / Jogging",
//   "Exercise 2": "Cycling",
//   "Exercise 3": "Swimming",
//   "Exercise 4": "Walking / Brisk Walking",
//   "Exercise 5": "Jump Rope",
//   "Exercise 6": "Rowing Machine",
//   "Exercise 7": "HIIT (High-Intensity Interval Training)",
//   "Exercise 8": "Strength Training (Weight Lifting)",
//   "Exercise 9": "Yoga / Pilates",
//   "Exercise 10": "Aerobics / Zumba",
// };

// export default function Home() {
//   const [age, setAge] = useState<string>("");
//   const [gender, setGender] = useState<string>("");
//   const [bmi, setBmi] = useState<string>("");
//   const [dreamWeight, setDreamWeight] = useState<string>("");
//   const [actualWeight, setActualWeight] = useState<string>("");
//   const [heartRate, setHeartRate] = useState<string>("");
//   const [weather, setWeather] = useState<string>("");
//   const [intensity, setIntensity] = useState<string>("");
//   const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     const intensityValue = Number(intensity);

//     if (intensityValue < 1 || intensityValue > 10) {
//       setError("Intensity must be between 1 and 10.");
//       return;
//     }

//     const formData = {
//       Age: Number(age),
//       Gender: gender,
//       BMI: Number(bmi),
//       "Dream Weight": Number(dreamWeight),
//       "Actual Weight": Number(actualWeight),
//       "Heart Rate": Number(heartRate),
//       "Weather Conditions": weather,
//       "Exercise Intensity": intensityValue,
//     };

//     console.log("📤 Sending data:", formData);

//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const data: PredictionResponse = await response.json();
//       console.log("📥 Received response:", data);

//       // Extract the Exercise name from exerciseMap
//       const exerciseName = exerciseMap[data.Exercise] || `Unknown Exercise (${data.Exercise})`;

//       setPrediction({
//         ...data,
//         Exercise: exerciseName,
//       });

//       setError(null);
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
//       console.error("❌ Error fetching prediction:", errorMessage);
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#3bb6bf]">
//   <h1 className="text-2xl font-bold mb-4">Exercise Predictor</h1>
//   <div className="flex flex-col space-y-3">
//     <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="border p-2" />
//     <select value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2">
//       <option value="">Select Gender</option>
//       <option value="Male">Male</option>
//       <option value="Female">Female</option>
//     </select>
//     <input type="number" placeholder="BMI" value={bmi} onChange={(e) => setBmi(e.target.value)} className="border p-2" />
//     <input type="number" placeholder="Dream Weight" value={dreamWeight} onChange={(e) => setDreamWeight(e.target.value)} className="border p-2" />
//     <input type="number" placeholder="Actual Weight" value={actualWeight} onChange={(e) => setActualWeight(e.target.value)} className="border p-2" />
//     <input type="number" placeholder="Heart Rate" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className="border p-2" />
//     <select value={weather} onChange={(e) => setWeather(e.target.value)} className="border p-2">
//       <option value="">Select Weather</option>
//       <option value="Sunny">Sunny</option>
//       <option value="Rainy">Rainy</option>
//       <option value="Cold">Cold</option>
//     </select>
//     <input type="number" placeholder="Exercise Intensity (1-10)" value={intensity} onChange={(e) => setIntensity(e.target.value)} className="border p-2" />
//     <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Predict</button>
//   </div>

//   {error && <p className="mt-4 text-red-500">Error: {error}</p>}

//   {prediction && (
//     <div className="mt-4 p-4 bg-white border rounded">
//       <h2 className="text-lg font-bold">Prediction Result</h2>
//       <p><strong>Exercise:</strong> {prediction.Exercise}</p>
//       <p><strong>Duration:</strong> {prediction["Duration (minutes)"]} minutes</p>
//       <p><strong>Calories Burned:</strong> {prediction["Calories Burned (kcal)"]} kcal</p>
//     </div>
//   )}
// </div>

//   );
// }

"use client";
import { useState } from "react";

interface PredictionResponse {
  Exercise: string;
  "Duration (minutes)": number;
  "Calories Burned (kcal)": number;
}

const exerciseMap: { [key: string]: string } = {
  "Exercise 1": "Running / Jogging",
  "Exercise 2": "Cycling",
  "Exercise 3": "Swimming",
  "Exercise 4": "Walking / Brisk Walking",
  "Exercise 5": "Jump Rope",
  "Exercise 6": "Rowing Machine",
  "Exercise 7": "HIIT (High-Intensity Interval Training)",
  "Exercise 8": "Strength Training (Weight Lifting)",
  "Exercise 9": "Yoga / Pilates",
  "Exercise 10": "Aerobics / Zumba",
};

export default function Home() {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");
  const [dreamWeight, setDreamWeight] = useState<string>("");
  const [actualWeight, setActualWeight] = useState<string>("");
  const [heartRate, setHeartRate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [intensity, setIntensity] = useState<string>("");
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const intensityValue = Number(intensity);

    if (intensityValue < 1 || intensityValue > 10) {
      setError("Intensity must be between 1 and 10.");
      return;
    }

    const formData = {
      Age: Number(age),
      Gender: gender,
      BMI: Number(bmi),
      "Dream Weight": Number(dreamWeight),
      "Actual Weight": Number(actualWeight),
      "Heart Rate": Number(heartRate),
      "Weather Conditions": weather,
      "Exercise Intensity": intensityValue,
    };

    console.log("📤 Sending data:", formData);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      console.log("📥 Received response:", data);

      const exerciseName = exerciseMap[data.Exercise] || `Unknown Exercise (${data.Exercise})`;

      setPrediction({
        ...data,
        Exercise: exerciseName,
      });

      setError(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("❌ Error fetching prediction:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3bb6bf]/10 to-[#3bb6bf]/20 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-[#3bb6bf]/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{color: '#3bb6bf'}}>
            Exercise Predictor
          </h1>
          <p className="text-sm text-[#3bb6bf]/80 mt-2">
            Personalized Workout Recommendation
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" 
              placeholder="Age" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            />
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" 
              placeholder="BMI" 
              value={bmi} 
              onChange={(e) => setBmi(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            />
            <input 
              type="number" 
              placeholder="Dream Weight" 
              value={dreamWeight} 
              onChange={(e) => setDreamWeight(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" 
              placeholder="Actual Weight" 
              value={actualWeight} 
              onChange={(e) => setActualWeight(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            />
            <input 
              type="number" 
              placeholder="Heart Rate" 
              value={heartRate} 
              onChange={(e) => setHeartRate(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select 
              value={weather} 
              onChange={(e) => setWeather(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            >
              <option value="">Select Weather</option>
              <option value="Sunny">Sunny</option>
              <option value="Rainy">Rainy</option>
              <option value="Cold">Cold</option>
            </select>
            <input 
              type="number" 
              placeholder="Exercise Intensity (1-10)" 
              value={intensity} 
              onChange={(e) => setIntensity(e.target.value)} 
              className="border border-[#3bb6bf]/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]/50"
            />
          </div>

          <button 
            onClick={handleSubmit} 
            className="w-full py-3 rounded-lg text-white font-semibold bg-[#3bb6bf] hover:bg-[#2a8a90] transition-colors"
          >
            Predict Workout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        {prediction && (
          <div className="bg-[#3bb6bf]/10 p-4 rounded-lg border border-[#3bb6bf]/20">
            <h2 className="text-xl font-semibold mb-3" style={{color: '#3bb6bf'}}>
              Recommended Workout
            </h2>
            <div className="space-y-2">
              <p>
                <strong style={{color: '#3bb6bf'}}>Exercise:</strong> {prediction.Exercise}
              </p>
              <p>
                <strong style={{color: '#3bb6bf'}}>Duration:</strong> {prediction["Duration (minutes)"]} minutes
              </p>
              <p>
                <strong style={{color: '#3bb6bf'}}>Calories Burned:</strong> {prediction["Calories Burned (kcal)"]} kcal
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}