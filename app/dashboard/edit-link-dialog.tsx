"use client";

import { useState, useTransition, type FormEvent } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "@/app/dashboard/actions";
import type { Link } from "@/db/schema";

export function EditLinkDialog({ link }: { link: Link }) {
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState(link.originalUrl);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setOriginalUrl(link.originalUrl);
      setError(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await updateLinkAction({ id: link.id, originalUrl });
      if (result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Edit link">
            <PencilIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription>
            Update the destination URL for /{link.shortCode}.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`originalUrl-${link.id}`}>URL</Label>
            <Input
              id={`originalUrl-${link.id}`}
              type="url"
              placeholder="https://example.com/very-long-link"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              required
              aria-invalid={error ? true : undefined}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
