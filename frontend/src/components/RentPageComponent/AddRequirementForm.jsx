return (
  
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Add your requirement</h1>
        <p>so that other users can contact you</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Add Your Location</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Approx Rent</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <fieldset>
          <legend className="text-base font-medium text-gray-900">Looking for</legend>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Male</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Female</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Any</button>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-base font-medium text-gray-900">Room Type</legend>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Single</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Shared</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Any</button>
          </div>
        </fieldset>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900">Choose Highlights for your property</h2>
        <div className="mt-2 space-y-2">
          <label className="block text-sm">
            <input type="checkbox" className="mr-2 leading-tight" />
            Working full time
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2 leading-tight" />
            College student
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2 leading-tight" />
            25+ age
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2 leading-tight" />
            Working night shift
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2 leading-tight" />
            Pure vegetarian
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <fieldset>
          <legend className="text-base font-medium text-gray-900">Are you interested in PG too?</legend>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Yes</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">No</button>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-base font-medium text-gray-900">Are you interested in Making Team?</legend>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Yes</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">No</button>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-base font-medium text-gray-900">Do you want to make your mobile visible to others?</legend>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 border rounded-md text-sm font-medium">Yes, make it public</button>
            <button className="px-4 py-2 border rounded-md text-sm font-medium">No, make it private</button>
          </div>
        </fieldset>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Write your post:
          <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </label>
      </div>

      <div className="mt-6">
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        <p className="mt-2 text-sm text-gray-500">Have room & roommate? Add room</p>
      </div>
    </div>

)