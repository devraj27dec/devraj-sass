import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react';
import React from 'react'


const featureItems = [
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
];

const BillingPage = () => {
  return (
    <div className=' max-w-md mx-auto py-4'>
      <Card className=' flex flex-col'>
        <CardContent className=' py-8'>
          <div>
            <h3 className=' inline-flex px-4 py-1
             text-6xl font-extrabold'>Monthly</h3>
          </div>

          <div className=' mt-4 flex items-baseline text-4xl font-extrabold'>
            $30 <span className=' ml-1 text-2xl text-muted-foreground'>/mo</span>
          </div>
          <p>
          Write as many notes as you want for $30 a Month
          </p>
        </CardContent>

        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className=' space-y-4'>
            {featureItems.map((item , index) => (
              <li key={index} className=' flex items-center'>
                <div className=' flex-shrink-0'>
                  <CheckCircle2 className=' h-6 w-6 text-green-500'/>
                </div>
                <p className=' ml-3 text-base'>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default BillingPage