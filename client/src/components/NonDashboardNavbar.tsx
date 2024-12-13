import Link from 'next/link'
import React from 'react'

const NonDashboardNavbar = () => {
  return (
    <nav className='nondashboard-navbar'>
        <div className='nondashboard-navbar__container'>
            <Link href="/" className='nondashboard-navbar__brand'>
                ZephyrAcademy
            </Link>
        </div>
    </nav>
  )
}

export default NonDashboardNavbar