import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Container } from './ui/reused-ui/Container.jsx'

const AddImages = () => {


	return (
        <Container
            text="Add Images"
            showResetButton={false}
            borderColor="#FF7B00"
            showSoundButton={true}
        >
            {/* Intro Text */}
            <div className='text-center text-sm text-gray-500 p-5 pb-3 flex-start'>
                Use the buttons on the addition equation to match the image addition below!
            </div>
        </Container>
)
};


export default AddImages;