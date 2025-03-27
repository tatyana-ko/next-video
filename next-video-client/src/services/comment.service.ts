import { axiosClassic, instance } from '@/api/axios';
import type { IComment, ICommentData } from '@/types/comments.types';

class CommentService {
	async getCommentsByVideoId(publicId: string) {
		const {data} = await axiosClassic.get<IComment[]>(`/comments/by-video/${publicId}`);

		return data;
	}

	updateComment(id: string, data: ICommentData) {
		return instance.put(`/comments/${id}`, data);
	}

	addComment(data: ICommentData) {
		return instance.post(`/comments`, data);
	}

  deleteComment(id: string) {
    return instance.delete(`/comments/${id}`);
  }
}
export const commentService = new CommentService();
