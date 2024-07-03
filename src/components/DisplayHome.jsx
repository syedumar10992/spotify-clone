import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import { albumsData } from '../assets/assets'
import { songsData } from '../assets/assets'
import SongItems from './SongItems'

const DisplayHome = () => {
  return (
    <>
    <Navbar />
    <div className='mb-4 '>
      <h1 className='my-[15px] font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-auto'>
      {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
      </div>
    </div>
    <div className='mb-4 '>
      <h1 className='my-[15px] font-bold text-2xl'>Today's biggest hits</h1>
      <div className='flex overflow-auto'>
      {songsData.map((item,index)=>(<SongItems key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
      </div>
    </div>
    </>
  )
}

export default DisplayHome