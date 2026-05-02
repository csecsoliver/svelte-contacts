import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { Contact } from "$lib/types";

export const actions = {
  default: async (event) => {
    let expr = db.prepare(`
				INSERT INTO contacts (name, address, phone)
				VALUES (@name, @address, @phone)
			`);
    await event.request.formData().then((formData) => {
      if (formData.get("id")) {
        let expr2 = db.prepare(`
          DELETE FROM contacts
          WHERE id = @id
        `);
        const id = formData.get("id") as string;
        expr2.run({ id: parseInt(id) });
      }
      const name = formData.get("name") as string;
      const address = formData.get("address") as string;
      const phone = formData.get("phone") as string;
      expr.run({ name, address, phone });
    });
    return redirect(303, "/");
  },
} satisfies Actions;
export const load: PageServerLoad = async (e) => {
  let statement;
  let result;
  if (e.url.searchParams.has("id")) {
    statement = db.prepare("SELECT * FROM contacts WHERE id = @id");
    result = statement.get({ id: e.url.searchParams.get("id") }) as Contact;
  }
  return { contact: result };
};
