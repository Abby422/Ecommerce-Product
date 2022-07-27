import React from 'react'
import { useParams } from 'react-router'

const UserDetails = () => {
  const { id } = useParams();
  return (
    <div className='userDetails'>

        <p>go back to users</p>

        <p>{`This is user ${id}`}</p>

    </div>
  )
}
export default UserDetails;