class PublicPage {
	HOME_PAGE = '/';
	TRENDING = '/trending';
	VIDEO_GAMES = '/video-games';

	MY_CHANNEL = '/my-channel';
	SUBSCRIPTIONS = '/subscriptions';
	PLAYLISTS = '/playlists';
	HISTORY = '/history';
	LIKED_VIDEOS = '/liked-videos';

	FEEDBACK = '/feedback';

	AUTH = '/auth';

	VIDEO = (path: string) => {
		return `/v/${path}`;
	};

	CHANNEL = (path: string) => {
		return `/channel/${path}`;
	};

	SEARCH = (searchQuery: string) => {
		return `/search?term=${searchQuery}`;
	};

	PLAYLIST_PATH = (path: string) => {
		return `/playlists${path? `/${path}` : ''}`;
	}
}

export const PUBLIC_PAGE = new PublicPage();
