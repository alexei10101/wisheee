/// <reference lib="webworker" />

import { precacheAndRoute, matchPrecache } from "workbox-precaching";
import { registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: any;
};

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.mode === "navigate",
  async () => {
    return (await matchPrecache("/index.html")) as Response;
  },
);

self.addEventListener("fetch", (event: FetchEvent) => {
  const url = new URL(event.request.url);

  if (event.request.method === "POST" && url.pathname === "/share-target") {
    event.respondWith(handleShare(event.request));
  }
});

async function handleShare(request: Request): Promise<Response> {
  const formData = await request.formData();

  const raw = {
    title: formData.get("title"),
    text: formData.get("text"),
    url: formData.get("url"),
    files: formData.getAll("files"),
  };

  const encoded = encodeURIComponent(JSON.stringify(raw));

  return Response.redirect(`/add-from-share?data=${encoded}`, 303);
}
