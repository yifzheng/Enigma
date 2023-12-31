'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import Pagination from "./Pagination"

const PromptCardList = ( { data, handleTagClick } ) => {
  return (
    <div className="mt-16 prompt_layout">
      { data.map( ( post ) => (
        <PromptCard
          key={ post._id }
          post={ post }
          handleTagClick={ handleTagClick }
        />
      ) ) }
    </div>
  )
}

const Feed = () => {
  const [ searchText, setSearchText ] = useState( '' )
  const [ posts, setPosts ] = useState( [] )
  const [ filteredPosts, setFilteredPosts ] = useState( [] )
  const [ currentPage, setCurrentPage ] = useState( 1 )
  const postsPerPage = 10; // number of posts to display per page

  // handle search change
  const handleSearchChange = ( e ) => {
    const newSearchText = e.target.value
    setSearchText( newSearchText )

    //clear existing timeout
    if ( window.debouncedSearchTimeout ) {
      clearTimeout( window.debouncedSearchTimeout )
    }

    // set a new timeout to perform search every 1.3 seconds
    window.debouncedSearchTimeout = setTimeout( () => {
      // check if the search text matches the tag of the prompt or the username
      const filtered = posts.filter( ( post ) => {
        return post.tag.includes( newSearchText ) || post.creator.username.includes( newSearchText ) || post.prompt.includes( newSearchText )
      } )
      setFilteredPosts( filtered )

    }, 1000 )
  }

  // handle tag click
  const handleTagClick = ( tag ) => {
    setSearchText( tag )

    //clear existing timeout
    if ( window.debouncedSearchTimeout ) {
      clearTimeout( window.debouncedSearchTimeout )
    }

    // set a new timeout to perform search every 1.3 seconds
    window.debouncedSearchTimeout = setTimeout( () => {
      // check if the search text matches the tag of the prompt or the username
      const filtered = posts.filter( ( post ) => {
        return post.tag.includes( tag )
      } )
      setFilteredPosts( filtered )

    }, 1000 )
  }

  // pagination logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchText ? filteredPosts.slice( indexOfFirstPost, indexOfLastPost ) : posts.slice( indexOfFirstPost, indexOfLastPost )

  const paginate = ( pageNumber ) => {
    setCurrentPage( pageNumber );
  };

  // fetch the data
  useEffect( () => {
    const fetchPosts = async () => {
      const response = await fetch( '/api/prompt' )
      const data = await response.json()
      setPosts( data )
      setFilteredPosts( data )
    }
    fetchPosts()
  }, [] )

  return (
    <section className="feed">
      <form className="relative w-full flex-center flex">
        <input
          type="text"
          placeholder="Search for a prompt, a tag or a username"
          value={ searchText }
          onChange={ handleSearchChange }
          required
          className="search_input peer"
        />
        <span className="absolute right-2 bg-red-600 text-gray-200 font-inter cursor-pointer p-1 rounded-lg" onClick={ () => setSearchText( '' ) }>Cancel</span>
      </form>

      <PromptCardList
        data={ currentPosts }
        handleTagClick={ handleTagClick }
      />

      <Pagination
        postsPerPage={ postsPerPage }
        totalPosts={ searchText ? filteredPosts.length : posts.length }
        paginate={ paginate }
        currentPage={ currentPage }
      />
    </section>
  )
}

export default Feed