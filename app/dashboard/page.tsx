import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const DashboardPage = async () => {

  
  return (
    <div className=' grid items-start gap-y-8'>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
       </div>
       <Button>
        <Link href='/dashboard/new'>Create a New Note</Link>
       </Button>
      </div>
    </div>
  )
}

export default DashboardPage