import React, {
  useState,
  useRef,
  useEffect, Children
} from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";

const CustomSwitch = ({ children,value})=>{
  const cases=[];
  const defaults=[];
Children.forEach(children, (e)=>{
  if(e.type.name==="CustomCase"){
    if(typeof e.props.value === "function"){
      console.log(e.props.value(value))
      if(e.props.value(value)){
      cases.push(e)
      }
    }else if(value === e.props.value){
      cases.push(e)
    }
  }else if(e.type.name==="DefaultCase"){
    defaults.push(e)
  }
})  
  if(cases.length>0) {
    return cases;
  }
  else {
    return defaults;
  }
}

const CustomCase = ({children})=>(<>{children}</>)

const DefaultCase = ({children})=>(<>{children}</>)

const App = () => {
  
  return (
    <>
      <CustomSwitch value="10000">
        <CustomCase value={(e) => e< 10}>
          <p>hello 10</p>
        </CustomCase>
        <CustomCase value="20">hello 20</CustomCase>
        <CustomCase value="30">hello 30</CustomCase>
        <DefaultCase>Hello 40</DefaultCase>
      </CustomSwitch>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
