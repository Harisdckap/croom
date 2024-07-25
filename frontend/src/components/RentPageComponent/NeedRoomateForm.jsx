import React, { useState } from 'react';
import "./AddRequirement.css";

 const Add_Reuirement = () => {
  const [lookingFor, setLookingFor] = useState('Any'); 
  const [roomType, setRoomType] = useState('Single'); 
  const [mVisible,setmVisible] = useState('')
  const [team , setTeam] = useState('')
  const [PG , setPG] = useState('')
  const [Highlights , setHighlights] = useState('')

  return (
    <div className="max-w-6xl mx-auto p-16 bg-white shadow-md rounded-md mt-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add your requirement</h1>
        <p className="text-gray-500 mt-2">so that other users can contact you</p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-32 mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-700">Add Your Location</label>
            <input
              type="text"
              className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Looking for</legend>
            <div className="mt-2 space-x-4">
              {['Male', 'Female', 'Any'].map((option) => (
                <button
                  key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${
                    lookingFor === option ? 'color' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setLookingFor(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex gap-32 mt-16">
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Approx Rent</label>
              <input
                type="text"
                className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Room Type</legend>
            <div className="mt-2 space-x-4">
              {['Single', 'Shared', 'Any'].map((option) => (
                <button
                value={option}
                key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${
                    roomType === option ? 'color' : 'hover:bg-gray-100'
                    
                  }`}
                  onClick={() => setRoomType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-medium text-gray-900 mt-16">Choose Highlights for your property</h2>
        <div className="mt-6 space-y-2 flex items-center justify-around">
          {['Working full time', 'College student', '25+ age', 'Working night shift', 'Pure vegetarian'].map((option) => (
            <button
              key={option}
              className={`mr-2 leading-tight rounded-lg bg-gray-100 px-7 py-2 hover:bg-gray-200 ${Highlights == option ? 'color' :'hover:bg-gray-100' }`}
              onClick={()=>setHighlights(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 space-y-4">
        <div className="flex gap-16">
          <fieldset className="border w-1/2 py-3">
            <legend className="text-base font-medium text-gray-900">Are you interested in PG too?</legend>
            <div className="mt-2 space-x-4 flex items-center justify-center">
              {["Yes","No"].map((option) =>(
                <button className={`px-10 py-2 border rounded-md text-sm font-medium ${ option == PG ? 'color' : 'hover:bg-gray-100'}`}
                onClick={()=>setPG(option)}
                >
                  {option}
                </button>
              ))}
              <button className="">
              </button>
            </div>
          </fieldset>
          <fieldset className="border w-1/2 py-3">
            <legend className="text-base font-medium text-gray-900">Are you interested in Making Team?</legend>            
            <div className="mt-2 space-x-4 flex items-center justify-center">
            {["Yes","No"].map((option)=>(
              <button 
              value={option}
              className = {`px-10 py-2 border rounded-md text-sm font-medium ${team == option ? 'color' : 'over:bg-gray-200' }`} 
              onClick={()=>(setTeam(option))}
              >
                {option}
              </button>
            ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-14">
        <fieldset className="border py-4">
          <legend className="text-base font-medium text-gray-900">Do you want to make your mobile visible to others?</legend>
          <div className="mt-2 ml-4 space-x-4">
            
            {["Yes make it public","No make it private"].map((conBtn => (

                <button 
                key={conBtn}
                 className={`px-14 py-3 border rounded-md text-sm font-medium ${conBtn == mVisible ? 'color' : 'hover:bg-gray-200'}`}
                 onClick={()=> setmVisible(conBtn)}
                >
                {conBtn}
                </button>
            )))
            }
        
          </div>
        </fieldset>
      </div>
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">
          Write your post:
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </label>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white color hover:bg-indigo-700 focus:outline-none bgHover"
        >
          Submit
        </button>
        <p className="mt-2 text-sm text-gray-500">Have room & roommate? Add room</p>
      </div>
    </div>
  );
};

export default Add_Reuirement;