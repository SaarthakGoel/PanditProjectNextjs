'use client'
import { useEffect, useRef } from "react";
import './index.css';


export default function FadeIn({children , cssClass}) {

  const ref = useRef(null);

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting && window){
          if(ref.current){
            ref.current.classList.add('fadeanimate')
          }
        }else{
          if(ref.current){
            ref.current.classList.remove('fadeanimate')
          }
        }
      });
    } , {threshold : 0.1});

    if(ref.current){
      observer.observe(ref.current)
    }

    return () => observer.disconnect();

  },[])

  return (
    <div ref={ref} className={`transform transition-all duration-200 opacity-0 ${cssClass}`}>
      {children}
    </div>
  )
}