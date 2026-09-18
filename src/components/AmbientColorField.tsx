import { useEffect, useRef } from "react";

export function AmbientColorField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let previous = window.scrollY;
    const update = () => { const delta=Math.max(-28,Math.min(28,(window.scrollY-previous)*.45)); ref.current?.style.setProperty("--scroll-flow",`${-delta}px`); previous=window.scrollY; };
    window.addEventListener("scroll",update,{passive:true}); return()=>window.removeEventListener("scroll",update);
  },[]);
  return <div ref={ref} className="ambient-field pointer-events-none fixed -inset-y-[15%] inset-x-0 overflow-hidden" aria-hidden="true">{Array.from({length:6},(_,index)=><span key={index}/>)}</div>;
}
