import React from "react";
import { Mail } from "lucide-react";

const Newsletter: React.FC = () => {
  return (
    <div className="my-16 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-900 p-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="bg-opacity-30 bg-primary mb-6 inline-flex items-center justify-center rounded-full p-3">
          <Mail size={28} className="text-primary" />
        </div>

        <h2 className="mb-4 text-3xl font-bold text-white">
          Stay updated with our newsletter
        </h2>

        <p className="text-primary mx-auto mb-8 max-w-2xl">
          Get the latest articles, tutorials, and updates from our blog directly
          to your inbox. No spam, just quality content.
        </p>

        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-opacity-50 border-primary focus:ring-primary flex-grow rounded-lg border bg-black px-4 py-3 text-white focus:ring-2 focus:outline-none"
          />

          <button className="bg-primary hover:bg-primary rounded-lg px-6 py-3 font-medium text-white transition-colors duration-300">
            Subscribe
          </button>
        </div>

        <p className="text-primary mt-4 text-sm">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
