<script>
	import { SideNav, SideNavItems } from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';
	import { page } from '$app/stores';

	import { isSideNavOpen } from './store';

	import A2HsLink from './A2HSLink.svelte';
</script>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		{#if $page.data.session?.user}
			<SideNavLink text="profile" href="/user/{$page.data.session?.user?.id}" />
		{/if}
		
		 <SideNavLink text="feedback" href="/feedback" />
		<A2HsLink />
	</SideNavItems>
</SideNav>
