import { Metadata } from "next";
import Oauth from "./oauth";

export const metadata: Metadata = {
  title: "Google Login Redirect",
  description: "Google Login Redirect",
  robots: {
    index: false,
  },
};

export default function OAuthPage() {
  return <Oauth />;
}
