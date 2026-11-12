<script lang="ts">
	// Renders `code` spans inside a plain string.
	let { text }: { text: string } = $props();
	const parts = $derived(text.split(/(`[^`]+`)/g).filter(Boolean));
</script>

{#each parts as p}{#if p.startsWith('`')}<code>{p.slice(1, -1)}</code>{:else}{p}{/if}{/each}
