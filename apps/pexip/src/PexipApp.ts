import type {
	IAppAccessors,
	IConfigurationExtend,
	IConfigurationModify,
	IEnvironmentRead,
	IHttp,
	ILogger,
	IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { ApiSecurity, ApiVisibility } from '@rocket.chat/apps-engine/definition/api';
import { App } from '@rocket.chat/apps-engine/definition/App';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';
import { ServerConfigurationEndpoint } from './endpoints/ServiceConfiguration';
import { AppSetting, settings } from './settings';
import { PexipProvider } from './videoConfProvider';

export class PexipApp extends App {
	private provider: PexipProvider | undefined;

	constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
		super(info, logger, accessors);
	}

	public async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		await Promise.all(settings.map((setting) => configuration.settings.provideSetting(setting)));

		const provider = this.getProvider();
		await configuration.videoConfProviders.provideVideoConfProvider(provider);

		await configuration.api.provideApi({
			visibility: ApiVisibility.PUBLIC,
			security: ApiSecurity.UNSECURE,
			endpoints: [
				new ServerConfigurationEndpoint(this),
			],
		});
	}

	public async onEnable(environmentRead: IEnvironmentRead, configModify: IConfigurationModify): Promise<boolean> {
		const settings = environmentRead.getSettings();

		const provider = this.getProvider();
		provider.baseUrl = await settings.getValueById(AppSetting.PexipBaseUrl);

		return true;
	}

	public async onSettingUpdated(setting: ISetting, configModify: IConfigurationModify, read: IRead, http: IHttp): Promise<void> {
		const provider = this.getProvider();

		switch (setting.id) {
			case AppSetting.PexipBaseUrl:
				provider.baseUrl = setting.value;
				break;
		}
	}

	private getProvider(): PexipProvider {
		if (!this.provider) {
			this.provider = new PexipProvider();
		}

		return this.provider;
	}
}