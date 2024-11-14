import * as React from "react";

import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import { siGithub, siGoogle } from "simple-icons";

const SIGNIN_ERROR_URL = "/not-found";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  searchParams: any;
}

export function UserAuthForm({ searchParams, className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              ...Object.fromEntries(formData),
              redirect: true,
              callbackUrl: searchParams?.callbackUrl ?? "/",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              E-mail
            </Label>
            <Input id="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Mot de passe
            </Label>
            <Input
              id="password"
              placeholder="•••••••••••••••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
            />
          </div>
          <Button className="font-medium">Connexion</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou continuez avec</span>
        </div>
      </div>
      <div className="grid gap-2">
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirect: true,
                  callbackUrl: searchParams?.callbackUrl ?? "/",
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <Button type="submit" variant="outline" className="w-full font-medium">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d={`${provider.name === "GitHub" ? siGithub.path : siGoogle.path}`} />
              </svg>
              Connexion avec {provider.name}
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
