
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const NewPage = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
        </CardHeader>
        <CardDescription>
          Right here you can now create your new notes
        </CardDescription>
        <CardContent>
          <Label>Title</Label>
          <Input
            required
            type='text'
            placeholder='Title for your Note'            
          />

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
              required
            />
          </div>
        </CardContent>
      </Card>
    </>
    
  )
}

export default NewPage