export interface IPageProps<T> {
	params: T;
}

export type TPageSlugProp = IPageProps<Promise<{slug: string}>>
export type TPagePublicId = IPageProps<Promise<{publicId: string}>>
export type TPageIdProp = IPageProps<{id: string}>
