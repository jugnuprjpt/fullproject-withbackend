import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import Edit from "./Edit";

const TodoListing = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData,setEditData] = useState([])
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    todolistingApi();
  }, []);

  const todolistingApi = async () => {
    const response = await fetch(
      `${API_URL}/api/v1/todos?query=reactjs&complete=false`
    );
    try {
      if (response.status === 200) {
        const getlist = await response.json();
        setList(getlist?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      title: title,
      description: description,
    };
    try {
      const response = await fetch(`${API_URL}/api/v1/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      const getCreate = await response.json();
      setList([...list, getCreate.data]);
      setTitle("");
      setdescription("");
      setOpen(false);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };
  
  const handleEdit = async(getId) => {
    const response = await fetch (`${API_URL}/api/v1/todos/${getId}`)
    try {
      if(response.status === 200)  {
        const getEdit = await response.json();
        const datagetEdit = getEdit.data;
        setEditData(datagetEdit)
        

      }
      
    } catch (error) {
      
    }
   
    setEditOpen(true);
  };

  const handleDelete = async (data) => {
    const response = await fetch(`${API_URL}/api/v1/todos/${data._id}`);

    try {
      if (response.status === 200) {
        const dataDelete = await response.json();
        setList(list.filter((item) => item._id !== dataDelete?.data?._id));
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleOpen}
      >
        Add Data
      </button>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4"></th>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Created Date
              </th>
              <th scope="col" class="px-6 py-3">
                Updated Date
              </th>
              {/* <th scope="col" class="px-6 py-3">
                Isdone
              </th> */}

              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item) => (
              <>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="w-4 p-4"></td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?._id}
                  </th>
                  <td class="px-6 py-4">{item?.title}</td>
                  <td class="px-6 py-4">{item?.description}</td>
                  <td class="px-6 py-4">{item?.createdAt}</td>
                  <td class="px-6 py-4">{item?.updatedAt}</td>
                  {/* <td class="px-6 py-4">{item.isComplete ? 'True' : 'False'}</td> */}

                  <td class="flex items-center px-6 py-4">
                    <div
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={()=>handleEdit(item?._id)}
                    >
                      Edit
                    </div>
                    <div
                      href="#"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {open === true && (
        <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-md max-h-full mx-auto mt-[139x]">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Data
                </h3>
                <button
                  type="button"
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="p-4 md:p-5">
                <form class="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      for="title"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        editOpen && 
        <Edit editOpen={editOpen} setEditOpen={setEditOpen} editData={editData} list={list} setList={setList}/>
      }
      
    </div>
  );
};

export default TodoListing;
