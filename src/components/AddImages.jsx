import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Container } from './ui/reused-ui/Container.jsx'
import './AddImages.css';

const AddImages = () => {
    // State Management
    const [apples, setApples] = useState(0);
    const [oranges, setOranges] = useState(0);
    const [inputApples, setInputApples] = useState(1);
    const [inputOranges, setInputOranges] = useState(1);
    const [inputAnswer, setInputAnswer] = useState(1);
    const [isShaking, setIsShaking] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    // Variable Management
    const messages = [
        'Great Job!',
        'Awesome!',
        'Fantastic Job!',
        'That\'s correct!',
        'Great Work!',
        'That\'s right!',
        'You got it!'
    ]

    // Functions
    const generateImages = () => {
        // Generate random total between 3 and 10 (inclusive)
        const total = Math.floor(Math.random() * 8) + 3; // 3-10
        
        // Generate random apples between 1 and (total-1), but max 9
        const maxApples = Math.min(total - 1, 9);
        const minApples = Math.max(1, total - 9); // Ensure oranges won't exceed 9
        const randomApples = Math.floor(Math.random() * (maxApples - minApples + 1)) + minApples;
        
        const randomOranges = total - randomApples;
        
        setApples(randomApples);
        setOranges(randomOranges);
    }

    useEffect(() => {
        generateImages();
    }, []);

    const checkAnswer = () => {
        if (inputApples + inputOranges === inputAnswer) {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.5 } });
            setShowAnswer(true);
            setTimeout(() => {
                setShowAnswer(false);
                setInputApples(1);
                setInputOranges(1);
                setInputAnswer(1);
                generateImages();
            }, 3000);
        } else {
            // Trigger shake animation for wrong answer
            setIsShaking(true);
            // Reset shake animation after it completes
            setTimeout(() => setIsShaking(false), 600);
        }
    }

	return (
        <Container
            text="Add Images"
            showResetButton={false}
            borderColor="#FF7B00"
            showSoundButton={true}
        >
            {/* Intro Text */}
            <div className='text-center text-sm text-gray-500 p-5 pb-3 flex-start'>
                Use the buttons on the addition equation to match the apples and oranges addition below!
            </div>

            {/* Images */}
            <div className='flex flex-grow justify-center items-center'>
                <div className='flex items-center justify-center gap-x-2 gap-y-2 flex-wrap'>
                    {/* Apples */}
                    {Array.from({ length: apples }, (_, index) => (
                        <div key={`apple-${index}`} className="flex justify-center items-center">
                            <div className="relative">
                                {/* Apple body */}
                                <div className="w-12 h-12 bg-red-500 rounded-full relative"/>
                                {/* Apple stem */}
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-amber-800 rounded-sm rotate-[-5deg]"/>
                                {/* Apple leaf */}
                                <div className="absolute -top-1 left-1/2 transform translate-x-[0px] w-3 h-2 bg-green-500 rounded-full rotate-[-45deg]"/>
                                {/* Apple highlight */}
                                <div className="absolute top-2 left-2 w-3 h-4 bg-red-300 rounded-full opacity-60 rotate-[15deg]"/>
                            </div>
                        </div>
                    ))}
                    
                    {/* Oranges */}
                    {Array.from({ length: oranges }, (_, index) => (
                        <div key={`orange-${index}`} className="flex justify-center items-center">
                            <div className="relative">
                                {/* Orange body */}
                                <div className="w-12 h-12 bg-orange-500 rounded-full relative"/>
                                {/* Orange texture dots */}
                                <div className="absolute top-2 left-3 w-1 h-1 bg-orange-600 rounded-full"/>
                                <div className="absolute top-4 left-2 w-1 h-1 bg-orange-600 rounded-full"/>
                                <div className="absolute top-3 right-3 w-1 h-1 bg-orange-600 rounded-full"/>
                                <div className="absolute bottom-3 left-4 w-1 h-1 bg-orange-600 rounded-full"/>
                                <div className="absolute bottom-4 right-2 w-1 h-1 bg-orange-600 rounded-full"/>
                                {/* Orange stem area */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-green-600 rounded-full"/>
                                {/* Orange highlight */}
                                <div className="absolute top-2 left-2 w-2 h-3 bg-orange-300 rounded-full opacity-70 rotate-[10deg]"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className={`relative bottom-[1%] flex flex-col justify-center items-center w-[100%] gap-2 p-5 pb-2 pt-2 transition-opacity`}>
                {showAnswer ? (
                    <>
                        <div className='text-center text-5xl font-extrabold text-green-600 p-5 pb-2 flex-start'>
                            {inputApples} + {inputOranges} = {inputAnswer}
                        </div>
                        <div className='text-center text-2xl font-extrabold text-green-600 p-5 pb-5 pt-0 flex-start'>
                            {messages[Math.floor(Math.random() * messages.length)]}
                        </div>
                    </>
                ) : (
                    <>
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <div className='w-[30%] flex flex-col justify-center items-center gap-2'>
                            <button 
                                className='w-6 h-6 flex items-center justify-center rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-300 shadow-sm'
                                onClick={() => setInputApples(Math.min(inputApples + 1, 10))}
                                aria-label='Increase Length'
                                >
                                ▲
                            </button>
                            <input 
                                type="text" 
                                readOnly
                                tabIndex={-1}
                                value={inputApples}
                                className='w-[90%] text-center border-2 border-red-400 rounded-lg p-2 focus:outline-none shadow-sm select-none pointer-events-none text-gray-800' 
                                />
                            <button 
                                className='w-6 h-6 flex items-center justify-center rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-300 shadow-sm'
                                onClick={() => setInputApples(Math.max(inputApples - 1, 1))}
                                aria-label='Decrease Length'
                            >
                                ▼
                            </button>
                        </div>
                        <div>
                            +
                        </div>
                        <div className='w-[30%] flex flex-col justify-center items-center gap-2'>
                            <button 
                                className='w-6 h-6 flex items-center justify-center rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-300 shadow-sm'
                                onClick={() => setInputOranges(Math.min(inputOranges + 1, 10))}
                                aria-label='Increase Width'
                            >
                                ▲
                            </button>
                            <input 
                                type="text" 
                                readOnly
                                tabIndex={-1}
                                value={inputOranges}
                                className='w-[90%] text-center border-2 border-orange-400 rounded-lg p-2 focus:outline-none shadow-sm select-none pointer-events-none text-gray-800' 
                            />
                            <button 
                                className='w-6 h-6 flex items-center justify-center rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-300 shadow-sm'
                                onClick={() => setInputOranges(Math.max(inputOranges - 1, 1))}
                                aria-label='Decrease Width'
                            >
                                ▼
                            </button>
                        </div>
                        <div>
                            =
                        </div>
                        <div className='w-[30%] flex flex-col justify-center items-center gap-2'>
                            <button 
                                className='w-6 h-6 flex items-center justify-center rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-300 shadow-sm'
                                onClick={() => setInputAnswer(Math.min(inputAnswer + 1, 10))}
                                aria-label='Increase Height'
                            >
                                ▲
                            </button>
                            <input 
                                type="text" 
                                readOnly
                                tabIndex={-1}
                                value={inputAnswer}
                                className='w-[90%] text-center border-2 border-green-400 rounded-lg p-2 focus:outline-none shadow-sm select-none pointer-events-none text-gray-800' 
                            />
                            <button 
                                className='w-6 h-6 flex items-center justify-center rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 border border-orange-300 shadow-sm'
                                onClick={() => setInputAnswer(Math.max(inputAnswer - 1, 1))}
                                aria-label='Decrease Height'
                            >
                                ▼
                            </button>
                        </div>
                    </div>

                    {/* Check Answer Button */}
                    <div className={`flex justify-center w-full transition-opacity`}>
                        <button 
                            onClick={checkAnswer} 
                            className={`w-24 md:w-28 lg:w-32 text-center border-2 border-orange-400 bg-yellow-100 hover:bg-orange-200 text-orange-600 rounded-lg p-1 focus:outline-none shadow-sm placeholder-black transition-transform duration-100 ${isShaking ? 'animate-pulse' : ''}`}
                            style={isShaking ? {
                                animation: 'shake 0.2s ease-in-out'
                            } : {}}
                        >
                            Check!
                        </button>
                    </div>
                </>)}
            </div>
        </Container>
)
};


export default AddImages;