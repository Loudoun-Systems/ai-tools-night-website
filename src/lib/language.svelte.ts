import { getContext, setContext } from 'svelte';
import type { Locale } from './types';

const LANGUAGE_CONTEXT = Symbol('wgn-language');

export class LanguageState {
	locale = $state<Locale>('en');

	set(next: Locale): void {
		this.locale = next;
	}

	toggle(): void {
		this.locale = this.locale === 'en' ? 'es' : 'en';
	}
}

export function createLanguageContext(): LanguageState {
	return setContext(LANGUAGE_CONTEXT, new LanguageState());
}

export function useLanguage(): LanguageState {
	return getContext<LanguageState>(LANGUAGE_CONTEXT);
}
