import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsEventDetails from "@/src/components/web/newAndEvents/newsEventDetails";
import { resolveEventImageUrl } from "@/src/service/webService/events";
import {
  getPublicEventBySlugServer,
  getPublicEventsServer,
} from "@/src/service/webService/events.server";

const getEvent = cache((slug: string) => getPublicEventBySlugServer(slug));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) return { title: "News & Events" };
  const image = resolveEventImageUrl(event.coverImage);
  return {
    title: event.title,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      type: "article",
      ...(image ? { images: [{ url: image, alt: event.title }] } : {}),
    },
  };
}

export default async function NewsEventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const related = await getPublicEventsServer(1, 4)
    .then((res) => res.events.filter((e) => e.slug !== event.slug).slice(0, 3))
    .catch(() => []);

  return <NewsEventDetails event={event} related={related} />;
}
