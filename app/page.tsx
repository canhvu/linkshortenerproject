import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { BarChart3, Check, Clock3, Link2, QrCode, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Instant Short Links",
    description: "Create clean and memorable short URLs in seconds for any destination.",
    Icon: Link2,
  },
  {
    title: "Built-In Analytics",
    description: "Track link performance with useful click insights from one dashboard.",
    Icon: BarChart3,
  },
  {
    title: "QR Code Ready",
    description: "Generate shareable links suitable for campaigns, print, and social posts.",
    Icon: QrCode,
  },
  {
    title: "Reliable Access",
    description: "Use secure Clerk authentication to manage your links confidently.",
    Icon: ShieldCheck,
  },
];

const highlights = [
  { label: "Fast setup", Icon: Clock3 },
  { label: "Simple management", Icon: Check },
  { label: "Made for sharing", Icon: Link2 },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-6 py-14 md:px-12 lg:px-20">
      <section className="grid gap-10 rounded-2xl border bg-card p-8 md:grid-cols-[2fr_1fr] md:p-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Modern URL management for teams and creators
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Shorten links quickly, share confidently, and track performance.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Link Shortener helps you create branded short links, keep them organized, and
            understand engagement from a single place.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <SignUpButton mode="modal">
              <Button size="lg">Get Started Free</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg">
                I already have an account
              </Button>
            </SignInButton>
          </div>
        </div>
        <div className="space-y-3 rounded-xl border bg-muted/40 p-5">
          <p className="text-sm font-medium text-foreground">Why users choose this app</p>
          {highlights.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 text-foreground" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Feature highlights</h2>
          <p className="text-muted-foreground">
            Everything you need to create, organize, and monitor your shortened links.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map(({ title, description, Icon }) => (
            <article key={title} className="rounded-xl border bg-card p-5">
              <div className="mb-3 inline-flex rounded-md border bg-muted p-2">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
