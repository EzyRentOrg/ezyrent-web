import React from 'react'
import DesktopHeroView from './DesktopHeroView'
import MobileHeroView from './MobileHeroView'

export default function HeroPage() {
  return (
    <header>
      <DesktopHeroView/>
      <MobileHeroView/>
    </header>
  )
}
