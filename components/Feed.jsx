'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

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
        return post.tag.includes( newSearchText ) || post.creator.username.includes( newSearchText )
      } )
      setFilteredPosts( filtered )

    }, 1300 )
  }

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
      <form className="relative w-full flex-center flex-col">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={ searchText }
          onChange={ handleSearchChange }
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={ filteredPosts }
        handleTagClick={ () => { } }
      />
    </section>
  )
}

export default Feed