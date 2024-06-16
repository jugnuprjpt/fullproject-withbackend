import React from 'react'

const Youtube = () => {
  return (
    <>
    {/* <!-- Navbar --> */}
    <nav class="bg-white shadow-md">
      <div class="container mx-auto flex items-center justify-between p-4">
        <div class="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="Logo" class="h-8 mr-4"/>
          <input type="text" placeholder="Search" class="border border-gray-300 rounded-md px-4 py-2 w-64"/>
          <button class="ml-2 px-4 py-2 bg-gray-200 rounded-md">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l4-4m0 0l4-4m-4 4H4"></path></svg>
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <button class="focus:outline-none">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A1.982 1.982 0 0118 14h-3v-4a4 4 0 10-8 0v4H4a2 2 0 01-2 2h9m0 0v6m0-6h6"></path></svg>
          </button>
          <button class="focus:outline-none">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M21 5h-4M19 3v4M12 3v2m0 4a5 5 0 00-5 5v1H7a3 3 0 00-3 3v1h6a3 3 0 003 3h2a3 3 0 003-3h6v-1a3 3 0 00-3-3h-1v-1a5 5 0 00-5-5z"></path></svg>
          </button>
          <img src="https://via.placeholder.com/150" alt="User Avatar" class="w-8 h-8 rounded-full"/>
        </div>
      </div>
    </nav>
  
    {/* <!-- Main Content --> */}
    <div class="container mx-auto mt-4 flex">
      {/* <!-- Sidebar --> */}
      <aside class="w-64 bg-white shadow-md p-4">
        <ul>
          <li class="py-2">
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded-md">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7m-7 7h18m-5 0v8a4 4 0 01-4 4H5a4 4 0 01-4-4v-8z"></path></svg>
              <span>Home</span>
            </a>
          </li>
          <li class="py-2">
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded-md">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 4a9 9 0 10-9 9 9 9 0 009-9z"></path></svg>
              <span>Trending</span>
            </a>
          </li>
          <li class="py-2">
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded-md">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2v-6a2 2 0 00-2-2h-7l-2-2h-3a2 2 0 00-2 2v2m12 4v2m0-10V7a2 2 0 00-2-2h-3l-2 2H7a2 2 0 00-2 2v2"></path></svg>
              <span>Subscriptions</span>
            </a>
          </li>
        </ul>
      </aside>
  
      {/* <!-- Videos Grid --> */}
      <main class="flex-1 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* <!-- Video Card --> */}
          <div class="bg-white rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://via.placeholder.com/320x180" alt="Video Thumbnail"/>
            <div class="p-4">
              <div class="font-bold text-lg mb-2">Video Title</div>
              <p class="text-gray-700 text-base mb-2">Channel Name</p>
              <p class="text-gray-700 text-sm">1M views • 1 week ago</p>
            </div>
          </div>
          {/* <!-- Repeat Video Card as necessary --> */}
          <div class="bg-white rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://via.placeholder.com/320x180" alt="Video Thumbnail"/>
            <div class="p-4">
              <div class="font-bold text-lg mb-2">Video Title</div>
              <p class="text-gray-700 text-base mb-2">Channel Name</p>
              <p class="text-gray-700 text-sm">1M views • 1 week ago</p>
            </div>
          </div>
          {/* <!-- Repeat Video Card as necessary --> */}
          <div class="bg-white rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://via.placeholder.com/320x180" alt="Video Thumbnail"/>
            <div class="p-4">
              <div class="font-bold text-lg mb-2">Video Title</div>
              <p class="text-gray-700 text-base mb-2">Channel Name</p>
              <p class="text-gray-700 text-sm">1M views • 1 week ago</p>
            </div>
          </div>
          {/* <!-- Repeat Video Card as necessary --> */}
          <div class="bg-white rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://via.placeholder.com/320x180" alt="Video Thumbnail"/>
            <div class="p-4">
              <div class="font-bold text-lg mb-2">Video Title</div>
              <p class="text-gray-700 text-base mb-2">Channel Name</p>
              <p class="text-gray-700 text-sm">1M views • 1 week ago</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
  )
}

export default Youtube