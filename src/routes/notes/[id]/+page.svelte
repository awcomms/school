<script lang="ts">
	import { grades, subjects, terms, years } from '$lib/constants/values';
	import { to_html } from '$lib/util/markdown/parse';
	import { Button } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import NoteChat from '$lib/components/NoteChat.svelte';

	export let data: PageData,
		chat_open = false;

	console.debug(data.h);
</script>

<p>Subject: {subjects.find((v) => v.value === data.s).label}</p>
<p>Grade: {grades.find((v) => v.value === data.g).label}</p>
<p>Year: {data.y}</p>
<p>Term: {terms.find((v) => v.value === data.t).label}</p>

<Button on:click={() => (chat_open = !chat_open)}>Understand this note better with AI</Button>

<NoteChat bind:open={chat_open} note={data.c} />

{@html data.h}
