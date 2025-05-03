"use client";
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

// Define interfaces for the API response
interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    name: string;
    sys: {
        country: string;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
}

// Define interface for recommendations
interface WeatherRecommendation {
    waterRecommendation: string;
    clothingRecommendation: string;
    walkRecommendation: string;
    precautions: string[];
}

const WeatherPage = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const getWeatherRecommendations = (
        temperature: number, 
        humidity: number
    ): WeatherRecommendation => {
        let waterRecommendation = '';
        let clothingRecommendation = '';
        let walkRecommendation = '';
        let precautions: string[] = [];

        // Water intake recommendations
        if (temperature < 10) {
            waterRecommendation = '1.5-2 liters per day';
        } else if (temperature < 20) {
            waterRecommendation = '2-2.5 liters per day';
        } else if (temperature < 30) {
            waterRecommendation = '2.5-3 liters per day';
        } else {
            waterRecommendation = '3-4 liters per day';
            precautions.push('High risk of dehydration');
        }

        // Clothing recommendations
        if (temperature < 10) {
            clothingRecommendation = 'Heavy winter coat, layers, gloves, and warm hat';
        } else if (temperature < 20) {
            clothingRecommendation = 'Light jacket or sweater';
        } else if (temperature < 30) {
            clothingRecommendation = 'Light, breathable clothing';
        } else {
            clothingRecommendation = 'Lightweight, loose-fitting clothes';
        }

        // Walking time recommendations
        if (temperature < 10) {
            walkRecommendation = 'Mid-day when it\'s warmest (11am-2pm)';
        } else if (temperature < 20) {
            walkRecommendation = 'Morning (7am-9am) or late afternoon (4pm-6pm)';
        } else if (temperature < 30) {
            walkRecommendation = 'Early morning (6am-8am) or evening (7pm-9pm)';
        } else {
            walkRecommendation = 'Early morning before 7am or late evening after 9pm';
            precautions.push('Extreme heat warning');
        }

        // Humidity considerations
        if (humidity > 80) {
            precautions.push('High humidity - increased heat stress risk');
        }

        return {
            waterRecommendation,
            clothingRecommendation,
            walkRecommendation,
            precautions
        };
    };

    const fetchWeatherData = async () => {
        // Trim and validate location
        const trimmedLocation = location.trim();
        if (!trimmedLocation) {
            setError('Please enter a city name');
            return;
        }

        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedLocation)}&appid=${API_KEY}&units=metric`
            );

            const data = await response.json();

            if (!response.ok) {
                // Handle API-specific error messages
                throw new Error(data.message || 'Unable to fetch weather data');
            }

            setWeatherData(data);
        } catch (err) {
            // More specific error handling
            if (err instanceof Error) {
                setError(err.message === 'city not found' 
                    ? `City "${trimmedLocation}" not found. Please check the spelling or try another city.` 
                    : err.message
                );
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const recommendations = weatherData 
        ? getWeatherRecommendations(
            weatherData.main.temp, 
            weatherData.main.humidity
        ) 
        : null;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#3bb6bf]">
                    Weather Recommendations
                </h1>

                <div className="mb-4 flex">
                    <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                fetchWeatherData();
                            }
                        }}
                        placeholder="Enter city name (e.g., London, New York)"
                        className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#3bb6bf]"
                    />
                    <button 
                        onClick={fetchWeatherData}
                        disabled={loading}
                        className="bg-[#3bb6bf] text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Get Weather'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
                        <AlertCircle className="mr-2 w-6 h-6" />
                        <span>{error}</span>
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#3bb6bf]"></div>
                    </div>
                )}

                {weatherData && (
                    <div className="bg-gray-50 p-6 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-[#3bb6bf]">
                                    {weatherData.name}, {weatherData.sys.country}
                                </h2>
                                <p className="text-4xl font-bold text-gray-800">
                                    {Math.round(weatherData.main.temp)}°C
                                </p>
                                <p className="text-gray-600 capitalize">
                                    {weatherData.weather[0].description}
                                </p>
                            </div>
                            <img 
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                                alt="Weather icon" 
                                className="w-24 h-24"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-gray-700">
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind: {weatherData.wind.speed} m/s</p>
                        </div>
                    </div>
                )}

                {recommendations && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-[#3bb6bf]">
                            Your Weather Guide
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-[#3bb6bf]">💧 Water Intake:</p>
                                <p>{recommendations.waterRecommendation}</p>
                            </div>
                            <div>
                                <p className="font-bold text-[#3bb6bf]">👚 Clothing:</p>
                                <p>{recommendations.clothingRecommendation}</p>
                            </div>
                            <div>
                                <p className="font-bold text-[#3bb6bf]">🚶 Best Walking Time:</p>
                                <p>{recommendations.walkRecommendation}</p>
                            </div>
                            {recommendations.precautions.length > 0 && (
                                <div>
                                    <p className="font-bold text-red-800">⚠️ Precautions:</p>
                                    <ul className="list-disc list-inside text-red-700">
                                        {recommendations.precautions.map((precaution, index) => (
                                            <li key={index}>{precaution}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherPage;