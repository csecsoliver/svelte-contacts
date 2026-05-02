<script lang="ts">
    import type { PageProps } from "./$types";
    import type {Contact} from "$lib/types";
    let { data } = $props() as PageProps;
    
</script>

<main>
    <form method="POST">
        <label for="name">
            Name
            <input type="text" name="name" id="name" required value={data.contact?.name} />
        </label>
        <label for="address">
            Address
            <input type="text" name="address" id="address" required value={data.contact?.address} />
        </label>
        <br>
        <label for="phone">
            Phone
            <input type="text" name="phone" id="phone" required value={data.contact?.phone} />
        </label>
        <br>
        <input type="hidden" name="id" value={data.contact?.id} />
        <button type="submit">Add contact</button>
    </form>
</main>