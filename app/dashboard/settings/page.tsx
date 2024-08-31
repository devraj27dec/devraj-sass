
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/components/SubmitButton";

async function getData(userId: string) {
  const data = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true
    }
  })

  return data;
}


const SettingPage = async() => {

  const { getUser} = getKindeServerSession()

  const user = await getUser()
  const data = await getData(user?.id as string)


  async function PostData(formData: FormData) {
    "use server"

    const name = formData.get('name') as string;
    const colorSchema = formData.get('color') as string;

    await prisma?.user.update({
      where: {
        id: user?.id
      },
      data: {
        name: name ?? undefined,
        colorScheme: colorSchema ?? undefined
      }
    })

    revalidatePath('/' , 'layout')
  }

  return (
    <div className=" grid items-start gap-8">
      <div className=" flex items-center justify-center px-2">
        <div className=" gap-1">
          <h1 className=" text-3xl md:text-4xl">Settings</h1>
          <p className=" text-lg text-muted-foreground">
            Your Profile Settings
          </p>
        </div>
      </div>
      <Card>
        <form action={PostData}>
          <CardHeader>
            <CardTitle>Genral Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className=" space-y-2">
              <div className=" space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className=" space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="text"
                  id="email"
                  placeholder="Enter Your Email"
                  defaultValue={data?.email ?? undefined}
                />
              </div>

              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme ?? undefined}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SettingPage;
