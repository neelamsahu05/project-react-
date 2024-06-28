import { useState ,useCallback,useEffect, useRef} from 'react'



function App() {

   const [length, setLength] = useState(8)
   const [numberAllowed,setNumberAllowed] = useState(false)
   const [charAllowed,setCharAllowed] =  useState(false)
   const [password,setPassword] = useState("")
    // use ref
   
    const passwordRef= useRef(null);
   
    const passwordGenrator =  useCallback(()=>{
      let pass=""
       let  str=  
             "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      
       if(numberAllowed) str+= "0123456789"
       if(charAllowed) str+= "~!@#$%^&*()_+-={}[]`"
       
       for (let i =1; i<=length; i++) {
        let char = Math.floor(Math.random() * str.length+1)
        pass += str.charAt(char);
        
       }
      
   setPassword(pass);
   }  ,[length,numberAllowed,charAllowed,setPassword])
     
   // function passwordto clipboard
    
      const passwordtoClipboard= useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,50);
         window.navigator.clipboard.writeText(password)
      },[password])

    // passwordGenrator();
       useEffect(()=>{
        passwordGenrator();
       },[length,numberAllowed,charAllowed,passwordGenrator])
    return (
    
        <div className='w-full max-w-lg  mb-4 rounded-md  mx-auto bg-gray-500  mt-20 p-4'> 
          <h1 className=' mb-7 text-2xl text-black '>password genrator</h1>
           <div className=' flex  shadow-md overflow-hidden mb-4 rounded-md'>
          
              <input type="text" className='  placeholder:text-xl py-2 px-3 w-full outline-none'
                value={password}
                placeholder='password'
                readOnly
                ref={passwordRef}
              />
              <button onClick={passwordtoClipboard}
              className=' py-1 text-white  bg-orange-500    px-3 '>copy</button>
           </div>
           <div className=' flex gap-x-3 text-sm'>
            <div className='flex justify-center gap-x-2'>
              <input type="range" className='  placeholder:text-blue-700 '
               value={length}
               min={8}
               max={50}
                onChange={(e)=> setLength(e.target.value)}/>
               <label className='  text-orange-950 text-xl'> length:{length}</label>
            </div>
            <div  className='flex items-center gap-x-1 text-xl text-orange-950'>
              <input type='checkbox'
               defaultChecked={numberAllowed}
               id='numberInput'
               onChange={()=> setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberchecked">Number</label>
            </div>
            <div  className='flex items-center gap-x-1 text-xl text-orange-950'>
              <input type='checkbox'
               defaultChecked={charAllowed}
               id='numberInput'
               onChange={()=> setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charchecked">symbol</label>
            </div>

           </div>
        
        </div>
          
  )
}

export default App
