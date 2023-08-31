'use client'

import Profile from "@components/Profile"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const UserProfile = () => {
    const params = useParams()
    const { id } = params
    const searchParams = useSearchParams();
    const userName = searchParams.get( 'username' )
    const [ posts, setPosts ] = useState( [] )

    // retrieve the prompts for this user
    useEffect( () => {
        const fetchPosts = async () => {
            const response = await fetch( `/api/users/${id}/posts` )
            const data = await response.json()
            setPosts( data )
        }

        if ( id ) fetchPosts()
    }, [ id ] )
    return (
        <Profile
            name={ userName.charAt( 0 ).toUpperCase() + userName.slice( 1 ) }
            desc={ `Welcome to ${userName.charAt( 0 ).toUpperCase() + userName.slice( 1 )}'s profile page. Explore ${userName.charAt( 0 ).toUpperCase() + userName.slice( 1 )}'s exceptional prompts and be inspired by the power of their imagination` }
            data={ posts }
        />
    )
}

export default UserProfile