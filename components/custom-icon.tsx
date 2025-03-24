import React from 'react';

export default function CustomIcon({
	className,
	size,
	icon,
	onClick,
}: {
	className?: string;
	size?: number;
	icon: string;
	onClick?: () => void;
}) {
	const iconSize = size || 36;
	const svgCode = (ICONS[icon] || '') as string;
	if (!svgCode) return null;
	return <div dangerouslySetInnerHTML={{ __html: svgCode }} className={className || ''} onClick={onClick} />;
}

const ICONS: Record<string, string> = {
	random: `<svg width="36" height="36" viewBox="0 0 36 36" fill="var(--svg-fill, currentColor)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.51146 9.85363C6.10011 9.75487 5.64877 9.75002 4.5 9.75002H3.75V8.25002H4.5C4.53312 8.25002 4.56584 8.25001 4.59818 8.25001C5.61675 8.24987 6.25641 8.24978 6.86163 8.39508C7.39732 8.52368 7.90943 8.73581 8.37916 9.02366C8.90984 9.34886 9.35795 9.79709 10.0709 10.5103C10.0934 10.5328 10.1161 10.5555 10.1392 10.5785L13.0607 13.5L12 14.5607L9.0785 11.6392C8.27498 10.8357 7.95624 10.5237 7.59541 10.3026C7.25989 10.097 6.8941 9.94549 6.51146 9.85363Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M27 4.93945L32.0303 9.96978C32.3232 10.2627 32.3232 10.7376 32.0303 11.0304L27 16.0608L25.9393 15.0001L29.6893 11.2501H26.9823C25.846 11.2501 25.4 11.2549 24.9885 11.3537C24.6059 11.4456 24.2401 11.5971 23.9046 11.8027C23.5438 12.0238 23.225 12.3357 22.4215 13.1393L10.1392 25.4216C10.1161 25.4446 10.0934 25.4674 10.0709 25.4899C9.35795 26.203 8.90984 26.6513 8.37916 26.9765C7.90943 27.2643 7.39732 27.4764 6.86163 27.6051C6.25641 27.7504 5.61675 27.7503 4.59817 27.7501C4.56583 27.7501 4.53311 27.7501 4.5 27.7501H3.75V26.2501H4.5C5.64877 26.2501 6.10011 26.2453 6.51146 26.1465C6.89409 26.0546 7.25989 25.9031 7.59541 25.6975C7.95624 25.4764 8.27498 25.1645 9.0785 24.361L21.3608 12.0786C21.3839 12.0556 21.4066 12.0329 21.4291 12.0104C22.142 11.2972 22.5902 10.849 23.1208 10.5238C23.5906 10.2359 24.1027 10.0238 24.6384 9.89517C25.2436 9.74987 25.8774 9.74996 26.8858 9.7501C26.9176 9.75011 26.9498 9.75011 26.9823 9.75011H29.6893L25.9393 6.00011L27 4.93945ZM27 19.9395L32.0303 24.9698C32.3232 25.2627 32.3232 25.7375 32.0303 26.0304L27 31.0608L25.9393 30.0001L29.6893 26.2501H26.9823C26.9498 26.2501 26.9176 26.2501 26.8858 26.2501C25.8774 26.2503 25.2436 26.2504 24.6384 26.1051C24.1027 25.9764 23.5906 25.7643 23.1208 25.4765C22.5902 25.1513 22.142 24.703 21.4291 23.9898C21.4066 23.9674 21.3838 23.9446 21.3608 23.9216L19.9393 22.5001L21 21.4395L22.4215 22.861C23.225 23.6645 23.5438 23.9764 23.9046 24.1975C24.2401 24.4031 24.6059 24.5546 24.9885 24.6465C25.4 24.7453 25.846 24.7501 26.9823 24.7501H29.6893L25.9393 21.0001L27 19.9395Z"></path></svg>`,
	loop: `<svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M30.7442 18.8497L30.6514 19.5939C29.867 25.8841 24.5025 30.7511 18 30.7511C14.1461 30.7511 10.6158 29.04 8.25 26.33V30.7511H6.75V24.0011C6.75 23.5869 7.08579 23.2511 7.5 23.2511H14.25V24.7511H8.89767C10.967 27.4804 14.3146 29.2511 18 29.2511C23.7364 29.2511 28.471 24.957 29.1629 19.4083L29.2557 18.6641L30.7442 18.8497Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.34866 16.4072C6.13304 10.117 11.4976 5.25 18.0001 5.25C21.8636 5.25 25.402 6.96967 27.7678 9.6915V5.25H29.2678V12C29.2678 12.4142 28.932 12.75 28.5178 12.75H28.5144C28.5053 12.7502 28.4962 12.7502 28.4871 12.75H21.7678V11.25H27.1024C25.033 8.52068 21.6855 6.75 18.0001 6.75C12.2637 6.75 7.52905 11.0441 6.83714 16.5928L6.74433 17.337L5.25586 17.1514L5.34866 16.4072Z"></path></svg>`,
};
