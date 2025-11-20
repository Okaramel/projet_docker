import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

import { db } from "./db/index.js";
import { quotes } from "./db/schema.js";

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/quote/random", async (c) => {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ error: "Failed to fetch quote" }, 500);
  }
});

app.post("/quotes", async (c) => {
  try {
    const body = await c.req.json();
    const { quote, author } = body; // dummyjson uses 'quote' instead of 'text' usually, but let's support what we send. 
    // Actually, let's assume the user sends { text, author } as per my plan.
    // If we want to support saving the random quote directly from dummyjson, it returns { quote, author, id }.
    // Let's handle { text, author } as primary.
    
    if (!body.text || !body.author) {
      return c.json({ error: "Missing text or author" }, 400);
    }

    const result = await db.insert(quotes).values({
      text: body.text,
      author: body.author,
    }).returning();

    return c.json(result[0]);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to save quote" }, 500);
  }
});

app.get("/quotes", async (c) => {
  try {
    const allQuotes = await db.select().from(quotes);
    return c.json(allQuotes);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch quotes" }, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
