<script lang="ts">
	import { Row, Column, TextArea, Button, Select, SelectItem } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
    import { sanitize_object, sanitize_string } from "$lib/util/sanitize";
    import { parse } from "$lib/util/markdown/parse/web";
	import { notify } from '$lib/util';
	import axios from 'axios';
	import { grades, subjects, terms, years } from '$lib/constants/values';

	// create variables for the select elements and bind them
	let g: string, // grade
		loading = false,
		c: string = '',
		t: string, // term
		y: string, // year
		s: string; // subject

	const add = async () => {
		loading = true;
		try {
			let payload = sanitize_object({ g, c, y, t, s });
			const html = await parse(payload.c as string);
			payload.h = sanitize_string(html);
			const res = await axios.post('/notes', payload);
			goto(`/notes/${res.data}`);
		} catch (e) {
			console.error('note creation error', e);
			notify({ kind: 'error', title: 'An error occured', subtitle: e });
		}
	};
</script>

<!-- use carbon-components-svelte to create a select menu for each variable -->
<Row>
	<Column
		><div>
			<Select labelText="Grade" bind:selected={g}>
				{#each grades as grade}
					<SelectItem value={grade.value} text={grade.label} />
				{/each}
			</Select>
		</div></Column
	>
	<Column
		><div>
			<Select labelText="Subject" bind:selected={s}>
				{#each subjects as subject}
					<SelectItem value={subject.value} text={subject.label} />
				{/each}
			</Select>
		</div></Column
	>
	<Column
		><div>
			<Select labelText="Term" bind:selected={t}>
				{#each terms as term}
					<SelectItem value={term.value} text={term.label} />
				{/each}
			</Select>
		</div></Column
	>
	<Column
		><div>
			<Select labelText="Year" bind:selected={y}>
				{#each years as year}
					<SelectItem value={year.value} text={year.label} />
				{/each}
			</Select>
		</div></Column
	>
</Row>

<TextArea bind:value={c} labelText="Note content" helperText="Put the note content her" />

<Button on:click={add}>Add</Button>
