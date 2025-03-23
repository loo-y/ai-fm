import { fetchAudio } from '../../utils/fetches';
import { type NextRequest } from 'next/server';
import { EMOTION_MAP } from '../../../shared/types';

// edge
export const runtime = 'edge';

export async function GET(request: NextRequest) {
	const headers = request.headers;

	const apiKey = headers.get('x-api-key') || '';
	const apiEndPoint = headers.get('x-api-endpoint') || '';
	const searchParams = request.nextUrl.searchParams;
	const message = searchParams.get('message') || '';
	const voice = searchParams.get('voice') || '';
	const emotion = searchParams.get('emotion') || '';
	const input_voice_value = searchParams.get('voice_value') || '';
	const voice_value = input_voice_value;
	return commonResponse({ message, voice: voice_value || voice, emotion, apiKey, apiEndPoint });
}
export async function POST(request: Request) {
	const headers = request.headers;
	const apiKey = headers.get('x-api-key') || '';
	const apiEndPoint = headers.get('x-api-endpoint') || '';
	const { message, emotion, voice, voice_value: input_voice_value } = await (request.json() as Promise<Record<string, any>>);
	const voice_value = input_voice_value;
	return commonResponse({ message, voice: voice_value || voice, emotion, apiKey, apiEndPoint });
}

const commonResponse = async ({
	message,
	voice,
	emotion,
	apiKey,
	apiEndPoint,
}: {
	message: string;
	voice: string;
	emotion?: string;
	apiKey?: string;
	apiEndPoint?: string;
}) => {
	if (!message || !voice) {
		return new Response(JSON.stringify({ eerror: 'message and voice are missing in headers' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
	try {
		let audioText = message;
		if (emotion && EMOTION_MAP?.[emotion]?.desc) {
			audioText = `你能用${EMOTION_MAP[emotion].desc}的情感说吗？<|endofprompt|>${message}`;
		}
		const {
			audioBuffer,
			status,
			message: responseMessage,
		} = await fetchAudio({
			audioText,
			apiKey,
			apiEndPoint,
			voice,
		});
		if (!status) {
			if (responseMessage) {
				return new Response(JSON.stringify({ error: responseMessage }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		}
		// 确保 audioBuffer 是 ArrayBuffer
		if (!(audioBuffer instanceof ArrayBuffer)) {
			console.error('fetchAudioPCM did not return an ArrayBuffer:', audioBuffer);
			return new Response(JSON.stringify({ error: 'Failed to fetch audio data' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(audioBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'audio/mpeg', // 或者 'audio/wav'，根据实际情况修改
				'Content-Length': audioBuffer.byteLength.toString(), // 设置 Content-Length
			},
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return new Response(JSON.stringify({ error: (error as Record<string, any>)?.message || 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
