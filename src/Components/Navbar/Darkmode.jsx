import { useState, useEffect } from 'react';
import light from '../../assets/light.jpg'
import dark from '../../assets/dark.png'

const Darkmode = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light' );

    const element = document.documentElement;

    useEffect(()=>{
        localStorage.setItem('theme', theme);

        if(theme === 'dark'){
            element.classList.add('dark');
            element.classList.remove('light');
        }
        else{
            element.classList.add('light');
            element.classList.remove('dark');
        }
    },[theme]);
    
  return (
    <div className='relative'>
        <img src={light} alt='light_theme' 
        onClick={() => setTheme(theme=='dark' ? 'light': 'dark')}
        className={`w-12 cursor-pointer absolute right-0 z-10 ${theme==="dark" ? 'opacity-0':'opacity-100'} transition-all duration-300`}/>

        <img src={dark} alt='light_theme' 
        onClick={() => setTheme(theme=='dark' ? 'light': 'dark')}
        className={`w-12 cursor-pointer`}/>
    </div>
  )
}

export default Darkmode