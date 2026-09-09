import { notFound, redirect } from "next/navigation";
import { getLinkByShortCode } from "@/data/links";

export async function GET(
  _request: Request,
  context: RouteContext<"/l/[shortcode]">
) {
  const { shortcode } = await context.params;
  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    notFound();
  }

  redirect(link.originalUrl);
}