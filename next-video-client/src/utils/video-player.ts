export const getTime = (time: number) => {
	return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};
