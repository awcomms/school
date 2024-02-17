<script lang="ts">
	import { Modal } from 'carbon-components-svelte';
	export let open = false, note: string;
	import Assistant from './ai_chat/Assistant.svelte';
</script>

<Modal bind:open modalHeading="AI chat">
	<p>You can ask the AI note assistant any question about this note</p>
	<Assistant
		description="Guide the user to easily completely understand the following text: {note}. Sufficiently answer any questions the user poses, and always with short, clear, simple to understand responses. If the answer to any of their queries is not in the note, indicate so clearly, and provide and answer to their query"
	/>
</Modal>
