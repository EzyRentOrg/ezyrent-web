"use client"

import React from 'react'
import DashboardLayout from '../components/Layouts'
import AdminHeader from '../components/AdminHeader'
import { useRouter } from 'next/navigation'

export default function PropertyManagement() {
  const router = useRouter()
  
  const handleCreateListing = () => {
    router.push("/admin/property-management/create-listing")
  }
  return (
    <DashboardLayout>
      <AdminHeader title={"property management"} btnTitle={"add property"} handleClick={handleCreateListing} />
      <main className="px-5">

      <div>assssssssssssssssss</div>
      </main>
    </DashboardLayout>
  )
}
