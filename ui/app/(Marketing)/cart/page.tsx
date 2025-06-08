"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  type: string;
  duration: string;
  price: string;
  quantity: number;
  selected: boolean;
}

export default function CartPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "1 Core-1GB-20GB-Việt Nam-Linux-Unlimited",
      type: "VPS Giá Rẻ",
      duration: "1 tháng",
      price: "50.000 đ",
      quantity: 1,
      selected: false,
    },
  ]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: checked })),
    );
  };

  const handleItemSelect = (itemId: string, checked: boolean) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, selected: checked } : item,
      ),
    );

    // Update select all state
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, selected: checked } : item,
    );
    setSelectAll(updatedItems.every((item) => item.selected));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      handleQuantityChange(itemId, item.quantity - 1);
    }
  };

  const increaseQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      handleQuantityChange(itemId, item.quantity + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6" />
            <h1 className="text-xl font-medium">Your Cart</h1>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              className="border-green-500 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
            />
            <label htmlFor="select-all" className="cursor-pointer text-sm">
              Select All
            </label>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-700 bg-gray-900/50 p-4"
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.selected}
                  onCheckedChange={(checked) =>
                    handleItemSelect(item.id, checked as boolean)
                  }
                  className="mt-1 border-green-500 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                />

                <div className="flex-1">
                  <div className="space-y-2">
                    <h3 className="leading-tight font-medium text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400">{item.type}</p>
                    <p className="text-sm text-gray-400">{item.duration}</p>
                    <p className="mt-3 text-lg font-medium text-white">
                      {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center rounded-md border border-gray-600">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => decreaseQuantity(item.id)}
                    className="h-8 w-8 rounded-r-none border-r border-gray-600 p-0 text-white hover:bg-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        Number.parseInt(e.target.value) || 1,
                      )
                    }
                    className="h-8 w-12 [appearance:textfield] border-0 bg-transparent text-center text-white focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    min="1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => increaseQuantity(item.id)}
                    className="h-8 w-8 rounded-l-none border-l border-gray-600 p-0 text-white hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 rounded-lg border border-gray-700 bg-gray-900/50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-gray-400">Total Items:</span>
            <span className="text-white">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-gray-400">Selected Items:</span>
            <span className="text-white">
              {cartItems.filter((item) => item.selected).length}
            </span>
          </div>
          <Button className="w-full bg-green-600 text-white hover:bg-green-700">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
