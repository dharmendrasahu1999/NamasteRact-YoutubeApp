import React from 'react'
import Button from './Button'
import '../index.css'
const ButtonList = () => {
  return (
    <div className={`flex fixed bg-white  mt-[5rem] w-[100%]`}>
      <Button name="All"/>
      <Button name="Gaming"/>
      <Button name="Songs"/>
      <Button name="Live"/>
      <Button name="Anime"/>
      <Button name="Cricket"/>
      <Button name="Cooking"/>
      <Button name="Soccer"/>
      <Button name="Valentines"/>
      <Button name="Soundtracks"/>
      <Button name="Manga"/>
      <Button name="Bleach"/>
    </div>
  )
}

export default ButtonList