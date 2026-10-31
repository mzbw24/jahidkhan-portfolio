"use client";

import { VideoPlayer } from "@/components/shared/video-player";
import type { FamilyVideo } from "@/types/family";
import type { PlayerLabels } from "@/types/gallery";

export function FamilyVideoPlayer({ video, labels }: { video: FamilyVideo; labels: PlayerLabels }) {
  return (
    <VideoPlayer
      video={{
        kind: "video",
        id: video.id,
        category: "events",
        sources: [{ src: video.src, type: "video/mp4" }],
        poster: { src: video.poster, thumb: video.poster, width: 1600, height: 1200, blur: "" },
        duration: 0,
        width: 16,
        height: 9,
      }}
      title={video.title}
      labels={labels}
      className="w-full max-w-5xl"
    />
  );
}
