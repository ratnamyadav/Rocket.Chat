import { createContext } from 'react';

import type keys from './en.json';

export { keys };

export type TranslationLanguage = {
	name: string;
	en: string;
	key: string;
};

export type TranslationKey = keyof typeof keys;

export type TranslationContextValue = {
	languages: TranslationLanguage[];
	language: TranslationLanguage['key'];
	loadLanguage: (language: TranslationLanguage['key']) => Promise<void>;
	translate: {
		(key: TranslationKey, ...replaces: unknown[]): string;
		has: (key: string | undefined) => key is TranslationKey;
	};
};

export const TranslationContext = createContext<TranslationContextValue>({
	languages: [
		{
			name: 'Default',
			en: 'Default',
			key: '',
		},
	],
	language: '',
	loadLanguage: async () => undefined,
	translate: Object.assign((key: string) => key, {
		has: (key: string | undefined): key is TranslationKey => Boolean(key),
	}),
});
