import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Test App",
  description: "Authentication forms built using the components.",
};

//@ts-ignore
export default function SignInLayout({ children }) {
  return <>{children}</>;
}
