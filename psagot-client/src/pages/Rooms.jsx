import React from 'react'
import RoomsSearchBar from "../components/RoomsSearchBar"
import ExampleUseGenericPopup from '../components/ExampleUseGenericPopup'
import RoomsGrid from '../components/RoomsGrid'

const Rooms = () => {
  return (
    <div>
        <RoomsSearchBar/>
        <RoomsGrid/>
        <ExampleUseGenericPopup/>
    </div>
  )
}

export default Rooms