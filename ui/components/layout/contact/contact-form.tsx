"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent! Thanks for reaching out.");
      form.reset();
    } catch {
      toast.error("Unable to send the message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-surface-elevated p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Send a message</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Share a little context and I will get back to you soon.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white/80">Name</FormLabel>
                  <FormControl>
                    <Input
                    placeholder="Your name"
                      className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus:border-primary/30 focus:ring-1 focus:ring-primary/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white/80">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus:border-primary/30 focus:ring-1 focus:ring-primary/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-sm text-white/80">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What would you like to discuss?"
                    className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus:border-primary/30 focus:ring-1 focus:ring-primary/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-sm text-white/80">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me a little more..."
                    className="min-h-[140px] border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus:border-primary/30 focus:ring-1 focus:ring-primary/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-black transition-all duration-300 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99]"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send message
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
