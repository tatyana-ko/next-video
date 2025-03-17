// import type { IVideo } from "@/types/video.types";
import axios from "axios";

class VideoService {
  getExploreVideos() {
    return axios.get('http://localhost:4200/api/videos/explore')
  }

  getTrendingVideos() {
    return axios.get('http://localhost:4200/api/videos/trending')
  }
}
export const videoService = new VideoService();