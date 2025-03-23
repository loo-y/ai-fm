import { sampleRate as defaultSampleRate } from '../../shared/constants';

const env = (typeof process != 'undefined' && process?.env) || ({} as NodeJS.ProcessEnv);
export const fetchAudio = async ({
	audioText,
	voice,
	sampleRate,
	format,
	apiKey,
	apiEndPoint,
}: {
	audioText: string;
	voice?: string;
	sampleRate?: number;
	format?: string;
	apiKey?: string;
	apiEndPoint?: string;
}): Promise<{ audioBuffer?: ArrayBuffer | null; status: boolean; message: string }> => {
	const speech_api_key = apiKey || env.SPEECH_API_KEY || '';
	const speech_api_endpoint = apiEndPoint || env.SPEECH_API_ENDPOINT || '';
	if (!speech_api_key) {
		return {
			audioBuffer: null,
			status: false,
			message: 'API key is missing in headers',
		};
	}
	if (!speech_api_endpoint) {
		return {
			audioBuffer: null,
			status: false,
			message: 'API endpoint is missing in headers',
		};
	}
	try {
		let useVoice = `FunAudioLLM/CosyVoice2-0.5B:${voice || 'anna'}`;
		if (voice && voice.indexOf('speech:') > -1) {
			useVoice = voice;
		}
		const response = await fetch(speech_api_endpoint, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${speech_api_key}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'FunAudioLLM/CosyVoice2-0.5B',
				input: audioText,
				voice: useVoice,
				response_format: format || `mp3`,
				sample_rate: sampleRate || defaultSampleRate,
				stream: false,
			}),
		});
		const result = await response.arrayBuffer();
		console.log(`🐹🐹🐹 fetchAudioPCM result legnth`, result.byteLength);
		return {
			audioBuffer: result,
			status: true,
			message: 'success',
		};
	} catch (e) {
		console.log(`🐹🐹🐹 fetchAudioPCM error`, e);
	}
	return {
		audioBuffer: null,
		status: false,
		message: 'Failed to fetch audio data',
	};
};
