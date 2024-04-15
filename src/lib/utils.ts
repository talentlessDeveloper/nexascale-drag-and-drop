import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function notFound() {
  return new Response("Not Found", { status: 404, statusText: "Not Found" });
}

export function badRequest(body: string) {
  return new Response(body, {
    status: 400,
    statusText: "Bad Request",
  });
}
