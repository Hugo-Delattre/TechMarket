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
import { Separator } from "@/components/ui/separator";

export type CartProps = {};

export const Cart = (props: CartProps) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Your cart</CardTitle>
        <CardDescription>{"Order when you're ready."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Product 1</Label>
        </div>
        <Separator />
        <div className="space-y-1">
          <Label htmlFor="username">Product 2</Label>
        </div>
        <Separator />
        <div className="space-y-1">
          <Label htmlFor="username">Product 3</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Order</Button>
      </CardFooter>
    </Card>
  );
};
