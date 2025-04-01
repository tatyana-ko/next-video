class StudioPage {
	HOME = '/studio';
	UPLOAD_VIDEO = `${this.HOME}/upload`;
	SETTINGS = `${this.HOME}/settings`;

	EDIT_VIDEO = (path: string) => {
		return `/studio/edit/v/${path}`;
	};

	EDIT_CHANNEL = (path: string) => {
		return `/edit/c/${path}`;
	};
}

export const STUDIO_PAGE = new StudioPage();
