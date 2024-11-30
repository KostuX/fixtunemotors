import { useParallax } from 'react-scroll-parallax';
export default function Spliter(){
    const parallax = useParallax({
        rotateY: [0, 360],
      });
    return(   <div ref={parallax.ref} className="spinner w-screen">
        ................
      </div>)
}