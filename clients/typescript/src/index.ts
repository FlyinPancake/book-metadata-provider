import { client } from "./api/client.gen";
import { search } from "./api/sdk.gen";

// This is just me testing the client. This will be replaced with a proper wrapper

client.setConfig({
  baseUrl: "http://localhost:3000",
  auth: () => "my-secret-token",
});

const { data: books } = await search({ query: { query: "Babel" } });

if (!books?.matches) throw new Error("No books found");

for (const book of books.matches) {
  console.log(book.title);
}
