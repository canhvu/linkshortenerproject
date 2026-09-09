import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkDialog } from "@/app/dashboard/create-link-dialog";
import { EditLinkDialog } from "@/app/dashboard/edit-link-dialog";
import { DeleteLinkDialog } from "@/app/dashboard/delete-link-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const { userId } = await auth.protect();
  if (!userId) {
    redirect("/");
  }

  const links = await getLinksByUserId(userId);

  return (
    <div className="mx-auto w-full max-w-[1380px] px-6 py-10 md:px-10 lg:px-0">
      <div className="mb-10 flex items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-medium tracking-tight">My Links</h1>
        <CreateLinkDialog />
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Card key={link.id} className="min-h-38">
              <CardHeader className="px-6 pt-6">
                <CardTitle>/{link.shortCode}</CardTitle>
                <CardDescription>{link.originalUrl}</CardDescription>
                <CardAction className="flex items-center gap-1">
                  <EditLinkDialog link={link} />
                  <DeleteLinkDialog link={link} />
                </CardAction>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-xs text-muted-foreground">
                  Created {link.createdAt.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

