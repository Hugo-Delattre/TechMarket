import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileDashboard() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              {
                "Make changes to your account here. Click save when you're done."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Login</Label>
              <Input id="name" defaultValue="toto33" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input id="username" defaultValue="toto33@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" defaultValue="Thomas" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" defaultValue="Harrit" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="profile-picture">Profile picture</Label>
              <Input id="profile-picture" defaultValue="http://" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              {"Change your password here. After saving, you'll be logged out."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
