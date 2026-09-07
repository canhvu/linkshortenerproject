import { SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  BarChart3,
  Link2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Create branded short links",
    description:
      "Turn long, messy URLs into clean short links that are easier to share anywhere.",
    icon: Link2,
  },
  {
    title: "Track what gets clicks",
    description:
      "Understand engagement with quick insights that help you see which links perform best.",
    icon: BarChart3,
  },
  {
    title: "Share with confidence",
    description:
      "Keep link management in one place with secure access for your signed-in workspace.",
    icon: ShieldCheck,
  },
];

const highlights = [
  "Fast setup with Clerk sign-in",
  "Centralized dashboard for saved links",
  "Built for simple sharing and management",
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-12 md:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="size-4 text-foreground" />
              Share smarter with a cleaner link experience
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Shorten, organize, and track every link from one simple app.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Link Shortener gives your team a fast way to create memorable
                short URLs, keep them organized, and understand which links are
                getting attention.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SignUpButton mode="modal">
                <Button size="lg">Start shortening links</Button>
              </SignUpButton>
            </div>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3"
                >
                  <Zap className="size-4 text-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s share</p>
                  <p className="mt-2 text-2xl font-semibold">
                    https://sho.rt/campaign-launch
                  </p>
                </div>
                <div className="rounded-full bg-muted p-3">
                  <Link2 className="size-5" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="mt-2 text-3xl font-semibold">24.8K</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Saved links</p>
                  <p className="mt-2 text-3xl font-semibold">128</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Active campaigns</p>
                  <p className="mt-2 text-3xl font-semibold">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-6" id="features">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Features
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to manage shareable links.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex rounded-2xl bg-muted p-3">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
