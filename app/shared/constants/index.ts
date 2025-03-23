import { Celebrity, EMOTION_MAP } from '../types';
export const sampleRate = 44100;

export const emotionList = Object.values(EMOTION_MAP);
// 模拟明星数据
export const celebrities: Celebrity[] = [
	{
		id: 'songyi',
		speech: 'speech:songyivoice005:clwx0imsh004t12vfvu9wsc84:rokjuuiivspoercjitcj',
		name: '车车',
	},
	{
		id: 'wangyibo',
		speech: 'speech:wangyibovoice001:clwx0imsh004t12vfvu9wsc84:intqcrzbymvpfrmbqcwk',
		name: '一搏',
	},
	{
		id: `alex`,
		name: `亚历克斯`,
	},
	{
		id: `anna`,
		name: `安娜`,
	},
	{
		id: `bella`,
		name: `贝拉`,
	},
	{
		id: `charles`,
		name: `查尔斯`,
	},
	{
		id: `claire`,
		name: `Claire`,
	},
	{
		id: `david`,
		name: `David`,
	},
	{
		id: `diana`,
		name: `戴安娜`,
	},
];
