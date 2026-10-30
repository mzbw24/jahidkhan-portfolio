"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Maximize, Minimize, Pause, PictureInPicture, Play, RotateCcw, Volume1, Volume2, VolumeX } from "lucide-react";
import { formatTime } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { GalleryVideoAsset, PlayerLabels } from "@/types/gallery";

interface VideoPlayerProps {
  video: GalleryVideoAsset;
  title: string;
  labels: PlayerLabels;
  autoPlay?: boolean;
  className?: string;
}

interface WebkitVideo extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
  webkitSupportsFullscreen?: boolean;
}

export function VideoPlayer({ video, title, labels, autoPlay = true, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(video.duration);
  const [fullscreen, setFullscreen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const fullscreenSupported =
    typeof document !== "undefined" &&
    (document.fullscreenEnabled || typeof (document.createElement("video") as WebkitVideo).webkitEnterFullscreen === "function");

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused || el.ended) {
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    const el = videoRef.current as WebkitVideo | null;
    if (!container || !el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (container.requestFullscreen) {
      container.requestFullscreen().catch(() => undefined);
    } else if (el.webkitEnterFullscreen) {
      el.webkitEnterFullscreen();
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = Math.min(Math.max(seconds, 0), Number.isFinite(el.duration) ? el.duration : seconds);
    setCurrent(el.currentTime);
  }, []);

  const changeVolume = useCallback((next: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = Math.min(Math.max(next, 0), 1);
    el.muted = el.volume === 0;
  }, []);

  const changeSpeed = useCallback((next: number) => {
    if (videoRef.current) videoRef.current.playbackRate = next;
  }, []);

  const enterPictureInPicture = useCallback(async () => {
    const el = videoRef.current as HTMLVideoElement & { requestPictureInPicture?: () => Promise<unknown> } | null;
    if (el?.requestPictureInPicture) await el.requestPictureInPicture().catch(() => undefined);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (autoPlay) el.play().catch(() => setPlaying(false));
    return () => {
      el.pause();
      el.removeAttribute("src");
      el.load();
    };
  }, [autoPlay, attempt]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return; 
      const key = event.key.toLowerCase();
      if (key === " " || key === "k") {
        if (key === " " && tag === "BUTTON") return; 
        event.preventDefault();
        togglePlay();
      } else if (key === "m") {
        event.preventDefault();
        toggleMute();
      } else if (key === "f") {
        event.preventDefault();
        toggleFullscreen();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [togglePlay, toggleMute, toggleFullscreen]);

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const timeText = `${formatTime(current)} / ${formatTime(duration)}`;

  return (
    <div
      ref={containerRef}
      data-testid="video-player"
      className={cn("group relative overflow-hidden rounded-xl bg-black text-white", className)}
    >
      <video
        key={attempt}
        ref={videoRef}
        poster={video.poster.src}
        preload="metadata"
        playsInline
        aria-label={title}
        className="h-full max-h-[70vh] w-full bg-black object-cover"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
        onClick={togglePlay}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          setFailed(false);
        }}
        onDurationChange={(event) => Number.isFinite(event.currentTarget.duration) && setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={(event) => {
          setMuted(event.currentTarget.muted);
          setVolume(event.currentTarget.volume);
        }}
        onError={() => setFailed(true)}
      >
        {video.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      {failed ? (
        <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-6 text-center">
          <p className="text-sm">{labels.error}</p>
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setAttempt((value) => value + 1);
            }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {labels.retry}
          </button>
        </div>
      ) : (
        <>
          {!playing ? (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={labels.play}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/50 backdrop-blur transition-transform hover:scale-105"
            >
              <Play className="ml-1 h-7 w-7 fill-white" aria-hidden="true" />
            </button>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-2 pt-8">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(event) => seekTo(Number(event.target.value))}
              aria-label={labels.seek}
              aria-valuetext={timeText}
              className="media-range w-full"
              style={{ "--fill": `${progress}%` } as CSSProperties}
            />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button type="button" onClick={togglePlay} aria-label={playing ? labels.pause : labels.play} className="media-btn">
                {playing ? <Pause className="h-5 w-5 fill-current" aria-hidden="true" /> : <Play className="h-5 w-5 fill-current" aria-hidden="true" />}
              </button>
              <button type="button" onClick={toggleMute} aria-label={muted ? labels.unmute : labels.mute} aria-pressed={muted} className="media-btn">
                <VolumeIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(event) => changeVolume(Number(event.target.value))}
                aria-label={labels.volume}
                aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`}
                className="media-range hidden w-20 sm:block"
                style={{ "--fill": `${(muted ? 0 : volume) * 100}%` } as CSSProperties}
              />
              <span className="ml-1 text-xs tabular-nums text-white/85" aria-hidden="true">
                {timeText}
              </span>
              <span className="flex-1" />
              <select aria-label={labels.speed} defaultValue="1" onChange={(event) => changeSpeed(Number(event.target.value))} className="h-8 rounded-md bg-white/10 px-1 text-xs text-white">
                <option value="0.75" className="text-black">0.75×</option>
                <option value="1" className="text-black">1×</option>
                <option value="1.25" className="text-black">1.25×</option>
                <option value="1.5" className="text-black">1.5×</option>
                <option value="2" className="text-black">2×</option>
              </select>
              {typeof document !== "undefined" && "pictureInPictureEnabled" in document && (videoRef.current as HTMLVideoElement & { requestPictureInPicture?: unknown } | null)?.requestPictureInPicture ? (
                <button type="button" onClick={enterPictureInPicture} aria-label={labels.pictureInPicture} className="media-btn"><PictureInPicture className="h-5 w-5" aria-hidden="true" /></button>
              ) : null}
              {fullscreenSupported ? (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? labels.exitFullscreen : labels.fullscreen}
                  aria-pressed={fullscreen}
                  className="media-btn"
                >
                  {fullscreen ? <Minimize className="h-5 w-5" aria-hidden="true" /> : <Maximize className="h-5 w-5" aria-hidden="true" />}
                </button>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
