'use client'

import { useState } from "react"
import PromptCard from "./PromptCard"
import Pagination from "./Pagination"

const PromptCardList = ( { data, handleEdit, handleDelete } ) => {
  return (
    <div className="mt-16 prompt_layout">
      { data.map( ( post ) => (
        <PromptCard
          key={ post._id }
          post={ post }
          handleEdit={ () => handleEdit && handleEdit( post ) }
          handleDelete={ () => handleDelete && handleDelete( post ) }
        />
      ) ) }
    </div>
  )
}

const Profile = ( { name, desc, data, handleEdit, handleDelete } ) => {
  const [ currentPage, setCurrentPage ] = useState( 1 )
  const postsPerPage = 8; // number of posts to display per page

  // pagination logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice( indexOfFirstPost, indexOfLastPost )

  const paginate = ( pageNumber ) => {
    setCurrentPage( pageNumber );
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left"><span className="blue_gradient">{ name } Profile</span></h1>
      <p className="desc text-left">{ desc }</p>

      <PromptCardList
        data={ currentPosts }
        handleEdit={ handleEdit }
        handleDelete={ handleDelete }
      />
      <Pagination
        postsPerPage={ postsPerPage }
        totalPosts={ data.length }
        paginate={ paginate }
        currentPage={ currentPage }
      />
    </section>
  )
}

export default Profile