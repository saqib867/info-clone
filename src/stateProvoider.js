import React,{createContext,useContext,useReducer} from "react"


//Prepare the data layer
 const StateContext=createContext()

//wrap our app and provoid the data layer

export const StateProvider=({initialState,reducer,children})=>{
     return(
     <StateContext.Provider value={useReducer(reducer,initialState)} >
        {children}
        
     </StateContext.Provider>
     )
}

//pull information form data layer
export const useStateValue=()=>useContext(StateContext)