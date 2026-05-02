import db from "$lib/server/db";
import type { Contact } from "$lib/types";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";

export const actions = {
  default: async (event) => {
    let expr = db.prepare(`
      DELETE FROM contacts
      WHERE id = @id
			`);
    await event.request.formData().then((formData) => {
      const id = formData.get("id") as string;
      expr.run({ id: parseInt(id) });
    });
    
  },
} satisfies Actions;

export const load: PageServerLoad = async () => {
  const statement = db.prepare("SELECT * FROM contacts");
  const result = statement.all() as Contact[];
  return { contacts: result };
};