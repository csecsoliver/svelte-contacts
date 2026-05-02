<script lang="ts">
    
 	import type { PageProps } from './$types';
 
	let { data }: PageProps = $props();
</script>
<main class="white-block">
    {#each data.contacts.toSorted((a,b)=> {
      return a.name.localeCompare(b.name)
    }) as contact}
    <div class="contact-element">
        <div>
            <p>{contact.name}</p>
            <p>{contact.address}</p>
        </div>
        <div style="text-align: right;">
            <p>{contact.phone}</p>
        </div>
        <form method="POST">
            <input type="hidden" name="id" value={contact.id} />
            <button type="submit" class="button-style">Delete</button>
            <a href="/add-contact?id={contact.id}">Edit</a>
        </form>
    </div>
    {/each}
    
    <div style="text-align: center; margin-top: 1rem;">
        <a href="/add-contact" class="button-style"> Add contact</a>
    </div>
</main>