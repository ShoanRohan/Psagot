import React from 'react'
import RoomsSearchBar from "../components/RoomsSearchBar"
import TempRoomsList from '../components/TempRoomsList'
import ExampleUseGenericPopup from '../components/ExampleUseGenericPopup'

const Rooms = () => {
  return (
    <div>
        <RoomsSearchBar/>
        {/* תוספת זמנית של רשימת כל החדרים */}
        <TempRoomsList/>
        <ExampleUseGenericPopup/>
    </div>
  )
}

export default Rooms