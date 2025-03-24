'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CustomButton } from '@/components/custom-button';
import { Switcher } from '@/components/ui/switcher';
import { celebrities, emotionList } from '@/app/shared/constants';
import _, { set } from 'lodash';
import CustomIcon from '@/components/custom-icon';
import Link from 'next/link';

const githubLink = 'https://github.com/loo-y/ai-fm';
enum PLAY_STATUS {
	PLAYING = 'STOP',
	BUSY = 'BUSY',
	READY = 'PLAY',
}
export default function Home() {
	const voiceLength = celebrities.length + 1;
	const voiceGridClass = `grid grid-cols-3 md:grid-cols-12 gap-3`;
	const [selectedVoice, setSelectedVoice] = useState<string>(celebrities[0].id);
	const [selectedVibe, setSelectedVibe] = useState<string>(emotionList[0].value);
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [mounted, setMounted] = useState<boolean>(false);
	const [scriptText, setScriptText] = useState<string>('');
	const [playStatus, setPlayStatus] = useState<PLAY_STATUS>(PLAY_STATUS.READY);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const scriptAudioRef = useRef<HTMLAudioElement>(null);

	const randomButtonRef = useRef<HTMLDivElement>(null);
	const loopButtonRef = useRef<HTMLDivElement>(null);
	const handleRandomClick = useCallback(() => {
		const randButton = randomButtonRef.current;
		if (randButton) {
			randButton.setAttribute('data-clicked', '');
			setTimeout(() => {
				randButton.removeAttribute('data-clicked');
			}, 150);
		}
		// 随机一个voice
		setSelectedVoice(_.sample(celebrities)?.id || celebrities[0].id);
	}, []);
	const handleLoopClick = useCallback(() => {
		const loopButton = loopButtonRef.current;
		if (loopButton) {
			loopButton.setAttribute('data-clicked', '');
			setTimeout(() => {
				loopButton.removeAttribute('data-clicked');
			}, 150);
		}
		// 清空情感选择
		setSelectedVibe('');
	}, []);

	const handleUpdateScript = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setScriptText(event.target.value);
	};

	const handleGetAudio = async () => {
		if (playStatus === PLAY_STATUS.BUSY) return;
		if (playStatus === PLAY_STATUS.PLAYING) {
			if (scriptAudioRef.current) {
				scriptAudioRef.current.pause();
				setPlayStatus(PLAY_STATUS.READY);
			}
			return;
		}
		if (!selectedVoice || !scriptText || !scriptText.trim()) return;
		setPlayStatus(PLAY_STATUS.BUSY);
		try {
			const selectedCeleb = _.find(celebrities, (celeb) => celeb.id === selectedVoice);
			if (!selectedCeleb) {
				throw new Error('Invalid voice selected');
			}
			const audioUrl = await fetchAudio({
				message: scriptText.trim(),
				voice: selectedVoice,
				voice_value: selectedCeleb.speech || '',
				emotion: selectedVibe || '',
			});
			// 模拟返回的音频URL，实际项目中这应该来自API响应
			setAudioUrl(audioUrl);
			if (audioUrl && scriptAudioRef.current) {
				scriptAudioRef.current.src = audioUrl;
				scriptAudioRef.current.play();
				setPlayStatus(PLAY_STATUS.PLAYING);
			} else {
				setPlayStatus(PLAY_STATUS.READY);
			}
		} catch (error) {
			console.error('生成音频出错:', error);
			setPlayStatus(PLAY_STATUS.READY);
		} finally {
		}
	};

	const handleDownload = () => {
		if (audioUrl && selectedVoice) {
			const link = document.createElement('a');
			link.href = audioUrl;
			link.download = `${selectedVoice}_配音.mp3`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	const handleUpdatePlayStatusAfterAudioEnd = () => {
		console.log(`audio ended`);
		if (playStatus === PLAY_STATUS.PLAYING) {
			setPlayStatus(PLAY_STATUS.READY);
		}
	};

	// Handle dark mode toggle
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	// Handle hydration
	useEffect(() => {
		setMounted(true);
		setScriptText(`感谢您与我们联系。我完全理解您对航班取消的沮丧，我在这里帮助您快速重新预订。

我只需要您原始预订的一些细节，比如您的预订确认号或乘客信息。一旦我有了这些信息，我将找到下一个可用的航班，并确保您顺利到达目的地。`);
	}, []);

	return (
		<>
			<div className="fm overflow-y-hidden h-screen px-1 min-h-[375px]">
				<div className="max-w-[var(--page-max-width-fm)] pb-32 pt-6 px-4 md:pb-24 selection:bg-[#ff4a00]/20 mx-auto overflow-y-scroll h-full scrollbar-hide">
					<header className="flex w-full max-w-(--page-max-width) mx-auto mb-12 md:mb-8 relative">
						<div className="grid grid-cols-12 gap-x-3">
							<div className="col-span-2 order-1 mb-8 md:mb-0">
								<div className="relative top-[0.0875rem]">
									<h1 className="font-bold text-xl">AI.fm</h1>
								</div>
							</div>
							<div className="col-span-12 md:col-span-7 xl:col-span-6 order-3 md:order-2">
								<div className="text-balance">
									<div className="text-current/70 mb-3">
										{`An interactive demo for developers to try text-to-speech model.`}
										{`一个供开发者尝试文本到语音模型的互动演示。`}
									</div>
								</div>
							</div>
						</div>
						<div className="absolute top-1 right-0 ">
							<Link href={githubLink} target="_blank" rel="noopener noreferrer">
								<img src="/icons/github.svg" alt="Github" className="w-8 h-8" />
							</Link>
						</div>
					</header>

					<main className="flex-1 flex flex-col gap-x-3 w-full max-w-(--page-max-width) mx-auto">
						<div className="flex flex-row">
							<div className="flex flex-1 flex-col shrink-0 mb-10">
								<div className="flex flex-row justify-between -mb-[1px] relative items-center gap-2">
									<div className="flex uppercase py-1 text-current/70 ">{`音色`}</div>
									<div className="flex flex-1 h-[1px] bg-foreground/8"></div>
								</div>
								<div className="flex flex-1 flex-col pt-3 rounded-md">
									<div className={`${voiceGridClass}`}>
										{_.map(celebrities, (celebrity, celebrityIndex) => (
											<div key={`${celebrity.id}_${celebrityIndex}`} className="col-span-1 md:col-span-2 xl:col-span-1 relative">
												<CustomButton
													color="default"
													selected={selectedVoice === celebrity.id}
													hasLed={true}
													onClick={() => setSelectedVoice(celebrity.id)}
													className="aspect-4/3 sm:aspect-2/1 lg:aspect-2.5/1 xl:aspect-square min-h-[80px] max-h-[100px] flex-col items-start justify-between relative"
												>
													<span>{celebrity.name}</span>
												</CustomButton>
											</div>
										))}
										<div className="col-span-1 md:col-span-2 xl:col-span-1 relative">
											<CustomButton
												ref={randomButtonRef}
												onClick={handleRandomClick}
												color="neutral"
												className="aspect-4/3 sm:aspect-2/1 lg:aspect-2.5/1 xl:aspect-square min-h-[80px] max-h-[100px] flex-col relative items-center justify-center"
												aria-label="Select random voice"
											>
												<CustomIcon className="" size={36} icon="random" />
											</CustomButton>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col md:flex-row gap-3">
							<div className="flex flex-col shrink-0 mb-10">
								<div className="flex flex-row justify-between -mb-[1px] relative items-center gap-2">
									<div className="flex uppercase py-1 text-current/70">{`情感氛围`}</div>
									<div className="flex flex-1 h-[1px] bg-foreground/8"></div>
								</div>
								<div className="flex flex-1 flex-col pt-3 rounded-md">
									<div className="flex flex-col gap-3">
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
											{_.map(emotionList, (emotion, emotionIndex) => (
												<CustomButton
													key={`${emotion.value}`}
													color="default"
													selected={selectedVibe === emotion.value}
													hasLed={true}
													onClick={() => setSelectedVibe(emotion.value)}
													className="aspect-4/3 sm:aspect-2/1 lg:aspect-2.5/1 min-h-[100px] max-h-[100px] flex-col items-start justify-between"
												>
													<span className="break-words pr-1">{emotion.desc}</span>
												</CustomButton>
											))}
											<CustomButton
												ref={loopButtonRef}
												onClick={handleLoopClick}
												color="neutral"
												className=" aspect-4/3 sm:aspect-2/1 lg:aspect-2.5/1 min-h-[100px] max-h-[100px]  flex-col items-center justify-center"
												aria-label="Generate new list of vibes"
											>
												<CustomIcon className="" size={36} icon="loop" />
											</CustomButton>
										</div>
										{/* <textarea
											id="input"
											rows={8}
											maxLength={999}
											className="w-full resize-none outline-none focus:outline-none bg-screen p-4 rounded-lg shadow-textarea text-[16px] md:text-[14px]"
											defaultValue={`Affect/personality: A cheerful guide

Tone: Friendly, clear, and reassuring, creating a calm atmosphere and making the listener feel confident and comfortable.

Pronunciation: Clear, articulate, and steady, ensuring each instruction is easily understood while maintaining a natural, conversational flow.

Pause: Brief, purposeful pauses after key instructions (e.g., "cross the street" and "turn right") to allow time for the listener to process the information and follow along.

Emotion: Warm and supportive, conveying empathy and care, ensuring the listener feels guided and safe throughout the journey.`}
										/> */}
									</div>
								</div>
							</div>
							<div className="flex flex-1 flex-col shrink-0 mb-10">
								<div className="flex flex-row justify-between -mb-[1px] relative items-center gap-2">
									<div className="flex uppercase py-1 text-current/70">{`脚本`}</div>
									<div className="flex flex-1 h-[1px] bg-foreground/8"></div>
								</div>
								<div className="flex flex-1 flex-col pt-3 rounded-md mb-20 md:mb-0">
									<div className="relative flex flex-col h-full w-full">
										<textarea
											id="prompt"
											value={scriptText}
											rows={8}
											maxLength={999}
											onChange={handleUpdateScript}
											className="w-full h-full min-h-[220px] resize-none outline-none focus:outline-none bg-screen p-4 rounded-lg shadow-textarea text-[16px] md:text-[14px] "
										/>
										<span className="absolute bottom-3 right-4 z-10 opacity-30 hidden sm:block">{scriptText.length || 0}</span>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
				<footer className="Footer_Footer__ElFDz py-3 left-0 right-0 px-1">
					<div className="relative max-w-[var(--page-max-width-fm)] px-4 m-auto">
						<div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
							<CustomButton color="tertiary" className="min-h-[60px] items-center justify-center !bg-[#6a6a6a]" onClick={handleDownload}>
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 4L12 16M12 16L18 10M12 16L6 10"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path d="M18 18H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="uppercase hidden md:inline pr-3 text-lg">Download</span>
							</CustomButton>
							<CustomButton color="secondary" className="min-h-[60px] items-center justify-center !bg-[#222]">
								<span className="flex gap-2 items-center justify-center">
									<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path d="M9 7H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M13 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<span className="uppercase hidden md:inline pr-3 text-lg">Share</span>
								</span>
							</CustomButton>
							<div className="flex col-span-1 sm:col-span-2">
								<CustomButton
									color="primary"
									className="relative w-full !bg-[var(--primary-fm)] min-h-[60px] items-center justify-center"
									onClick={handleGetAudio}
								>
									{playStatus == PLAY_STATUS.BUSY ? (
										<div className="overflow-hidden relative w-[32px] h-[32px] align-center">
											<div className="w-[72px] h-[60px] absolute -top-[14px] -left-[20px]">
												<img src="/icons/loading.gif" alt="Playing" className="w-[72px] h-[60px]" />
											</div>
										</div>
									) : null}
									{playStatus == PLAY_STATUS.PLAYING ? (
										<div className="overflow-hidden w-[32px] h-[32px]">
											<div className="w-24 h-[32px]">
												<img src="/icons/playing.gif" alt="Playing" className="w-24 h-[32px]" />
											</div>
										</div>
									) : null}
									{playStatus == PLAY_STATUS.READY ? (
										<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M5 5L19 12L5 19V5Z"
												stroke="currentColor"
												fill="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									) : null}
									<span className="uppercase hidden md:inline pr-3 text-lg">{playStatus}</span>
								</CustomButton>
								{audioUrl ? <audio ref={scriptAudioRef} onEnded={handleUpdatePlayStatusAfterAudioEnd} src="" preload="auto"></audio> : null}
							</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}

const fetchAudio = async ({
	message,
	voice,
	voice_value,
	emotion,
}: {
	message: string;
	voice: string;
	voice_value?: string;
	emotion?: string;
}) => {
	try {
		// 替换为你的 API 端点
		const apiUrl = `/api/getaudio`;
		const body = {
			message,
			voice,
			emotion,
			voice_value,
		};
		const response = await fetch(apiUrl, {
			method: 'POST', // 或者 'POST'，根据你的 API 配置
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			const errorData = await response.json(); // 尝试解析 JSON 错误信息
			throw new Error(
				`Failed to fetch audio: ${response.status} ${response.statusText} - ${(errorData as Record<string, any>)?.error || 'Unknown error'}`,
			);
		}
		const arrayBuffer = await response.arrayBuffer();
		const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' }); // 替换为你的音频类型
		const url = URL.createObjectURL(blob);
		return url;
	} catch (e: any) {
		console.error('Error fetching audio:', e);
		return null;
	}
};
