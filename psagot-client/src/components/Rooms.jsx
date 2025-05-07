import React from 'react'
import RoomsSearchBar from "./RoomsSearchBar"
import TempRoomsList from './TempRoomsList'

const Rooms = () => {
  return (
    <div>
        <RoomsSearchBar/>
        {/* תוספת זמנית של רשימת כל החדרים */}
        <TempRoomsList/>
    </div>
  )
}

export default Rooms