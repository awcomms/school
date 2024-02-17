import { browser } from "$app/environment";

export const download_blob = (blob: Blob, name: string) => {
    if (!browser) return // TODO-error
	const a = document.createElement('a');
	a.href = window.URL.createObjectURL(blob);
	a.download = name;
	a.click();
};
