import React, {
  useState,
  useRef,
  useEffect, Children
} from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";


const App =()=>{
  const [count,setCount]= useState(30)
  
  useEffect(()=>{
    const onScroll =()=>{
      console.log(window.innerHeight)
      console.log(window.scrollY)
      console.log(window.document.body.offsetHeight)
    if(window.innerHeight + window.scrollY >=window.document.body.offsetHeight - 30){
      setCount((prevCount)=> prevCount+50)
    }
  }
    
  window.addEventListener('scroll', onScroll)
  
  return(()=>{
    window.removeEventListener("scroll", onScroll)
  })
  },[])

  const elements = []
  for(let i=0;i<count;i++){
    elements.push(<div key={i}>{i+1}</div>)
  }
  return <p>{elements}</p>
}

ReactDOM.render(<App/>, document.getElementById("root"))