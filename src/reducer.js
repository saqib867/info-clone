export const initialState={

     user:null
}

const reducer=(state,action)=>{
    console.log(action)
     switch(action.type){

          case 'LOG_USER':
               return{
                    ...state,
                    user:action.user
               }
          default:
              return state
     }
}

export default reducer
