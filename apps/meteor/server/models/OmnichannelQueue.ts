import type { IOmnichannelQueueStatus } from '@rocket.chat/core-typings';
import type { IOmnichannelQueueModel } from '@rocket.chat/model-typings';
import { registerModel } from '@rocket.chat/models';

import { ModelClass } from './ModelClass';
import { trashCollection } from '../database/trash';
import MeteorModel from '../../app/models/server/models/OmnichannelQueue';

const UNIQUE_QUEUE_ID = 'queue';
export class OmnichannelQueue extends ModelClass<IOmnichannelQueueStatus> implements IOmnichannelQueueModel {
	initQueue(): any {
		return this.col.updateOne(
			{
				_id: UNIQUE_QUEUE_ID,
			},
			{
				$unset: {
					stoppedAt: 1,
				},
				$set: {
					startedAt: new Date(),
					locked: false,
				},
			},
			{
				upsert: true,
			},
		);
	}

	stopQueue(): any {
		return this.col.updateOne(
			{
				_id: UNIQUE_QUEUE_ID,
			},
			{
				$set: {
					stoppedAt: new Date(),
					locked: false,
				},
			},
		);
	}

	async lockQueue(): Promise<any> {
		const date = new Date();
		const result = await this.col.findOneAndUpdate(
			{
				_id: UNIQUE_QUEUE_ID,
				$or: [
					{
						locked: true,
						lockedAt: {
							$lte: new Date(date.getTime() - 5000),
						},
					},
					{
						locked: false,
					},
				],
			},
			{
				$set: {
					locked: true,
					// apply 5 secs lock lifetime
					lockedAt: new Date(),
				},
			},
			{
				sort: {
					_id: 1,
				},
			},
		);

		return result.value;
	}

	async unlockQueue(): Promise<any> {
		const result = await this.col.findOneAndUpdate(
			{
				_id: UNIQUE_QUEUE_ID,
			},
			{
				$set: {
					locked: false,
				},
				$unset: {
					lockedAt: 1,
				},
			},
			{
				sort: {
					_id: 1,
				},
			},
		);

		return result.value;
	}
}

const col = MeteorModel.model.rawCollection();
registerModel('IOmnichannelQueueModel', new OmnichannelQueue(col, trashCollection) as IOmnichannelQueueModel);