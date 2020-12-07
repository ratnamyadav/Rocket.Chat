import { lazy, useMemo } from 'react';

import { addAction } from '../../../../client/views/room/lib/Toolbox';
import { usePermission } from '../../../../client/contexts/AuthorizationContext';
import { useSetting } from '../../../../client/contexts/SettingsContext';

addAction('autotranslate', () => {
	const hasPermission = usePermission('auto-translate');
	const autoTranslateEnabled = useSetting('AutoTranslate_Enabled');
	return useMemo(() => (hasPermission && autoTranslateEnabled ? {
		groups: ['channel', 'group', 'direct'],
		id: 'autotranslate',
		title: 'Auto_Translate',
		icon: 'language',
		template: lazy(() => import('../../../../client/views/room/AutoTranslate')),
		order: 20,
		full: true,
	} : null), [autoTranslateEnabled, hasPermission]);
});
