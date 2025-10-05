import { useEffect } from 'react'
import { setCurrentYear } from '../utils/year'

export default function UseYearEffect(){
  useEffect(()=>{
    setCurrentYear()
  },[])
  return null
}
