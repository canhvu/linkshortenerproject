"use client";

import { useState, useTransition, type FormEvent } from "react";
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
import { createLinkAction } from "@/app/dashboard/actions";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setError(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createLinkAction({ originalUrl });
      if (result.error) {
        setError(result.error);
        return;
      }
      setOriginalUrl("");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button>Create link</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new link</DialogTitle>
          <DialogDescription>
            Paste a long URL to generate a short link.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="originalUrl">URL</Label>
            <Input
              id="originalUrl"
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
              {isPending ? "Creating…" : "Create link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
