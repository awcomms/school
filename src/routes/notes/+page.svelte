<script lang="ts">
	import { Column, Select, SelectItem } from 'carbon-components-svelte';
	import { Row, TextInput, Button, InlineLoading, TextArea } from 'carbon-components-svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import type { SearchDocument } from '$lib/types';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { onMount } from 'svelte';
	import type { Filters as _Filters } from '$lib/types/filter';
	import SearchPagination from '$lib/components/Search/SearchPagination.svelte';

	export let searched = false,
		text = '',
		route: string,
		placeholder: string,
		total: number = 0,
		documents: SearchDocument[] = [],
		loading = false,
		p: number = 1;

	$: page_update(p);

	const page_update = (p: number) => {
		if (searched) get(p);
	};

	onMount(() => search_input_ref.focus());

	let search_input_ref: HTMLTextAreaElement;
	const get = async (p: number) => {
		if (!text) return;
		searched = true;
		loading = true;
		try {
			const r = await axios.get(`/notes`, { params: { s, g, y, t, q, p } });
			({ total, documents, p } = r.data);
			searched = true;
		} catch (e: any) {
			notify({
				title: `User search error`,
				subtitle: e.response.data.message ?? undefined,
				kind: 'error'
			});
		}

		loading = false;
	};

	// define the types for the grades, subjects, terms and years
	type Grade = {
		value: string;
		label: string;
	};
	type Subject = {
		value: string;
		label: string;
	};
	type Term = {
		value: string;
		label: string;
	};
	type Year = {
		value: string;
		label: string;
	};

	// create a list of grades and their labels
	const grades: Grade[] = [
		{ value: 'n1', label: 'Nursery 1' },
		{ value: 'n2', label: 'Nursery 2' },
		{ value: 'g1', label: 'Grade 1' },
		{ value: 'g2', label: 'Grade 2' },
		{ value: 'g3', label: 'Grade 3' },
		{ value: 'g4', label: 'Grade 4' },
		{ value: 'g5', label: 'Grade 5' },
		{ value: 'j1', label: 'Junior Secondary 1' },
		{ value: 'j2', label: 'Junior Secondary 2' },
		{ value: 'j3', label: 'Junior Secondary 3' }
	];

	// create a list of subjects and their labels
	const subjects: Subject[] = [
		{ value: 'math', label: 'Mathematics' },
		{ value: 'eng', label: 'English' },
		{ value: 'sci', label: 'Science' },
		{ value: 'soc', label: 'Social Studies' },
		{ value: 'art', label: 'Art' },
		{ value: 'mus', label: 'Music' },
		{ value: 'phy', label: 'Physical Education' },
		{ value: 'rel', label: 'Religion' },
		{ value: 'his', label: 'History' },
		{ value: 'geo', label: 'Geography' },
		{ value: 'lit', label: 'Literature' }
	];

	// create a list of terms and their labels
	const terms: Term[] = [
		{ value: '1', label: '1st term' },
		{ value: '2', label: '2nd term' },
		{ value: '3', label: '3rd term' }
	];

	// create a list of years and their labels
	const years: Year[] = [
		{ value: '2024', label: '2024' },
		{ value: '2025', label: '2025' },
		{ value: '2026', label: '2026' },
		{ value: '2027', label: '2027' }
	];

	// create variables for the select elements and bind them
	let g: string; // grade
	let t: string; // term
	let y: string; // year
	let s: string; // subject
	let q: string = '';
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

<div class="input">
	<TextArea
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				get(p);
			}
		}}
		rows={1}
		{placeholder}
		bind:ref={search_input_ref}
		bind:value={q}
	/>
	<Button size="field" on:click={() => get(p)} iconDescription="Search" icon={Search} />
</div>

{#if loading}
	<div class="line line-space">
		<p>Searching</p>
		<InlineLoading />
	</div>
{/if}

{#if searched}
	{#if documents.length}
		<SearchPagination
			{route}
			{total}
			on:update={({ detail }) => {
				page_update(detail.page);
			}}
			on:click
			{documents}
			page={p}
		/>
	{:else if !loading}
		<div class="line">No results</div>
	{/if}
{/if}

<style lang="sass">
    @use '@carbon/layout'
    .input
        display: flex
        flex-direction: row
    .line-space
        column-gap: layout.$spacing-04
    .line
        display: flex
        align-items: center
        justify-content: center
</style>
