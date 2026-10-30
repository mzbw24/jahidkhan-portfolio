"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Play,
  Users,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FamilyCategory, FamilyPageContent } from "@/types/family";
import type { Localized } from "@/types/common";

export function FamilyView({
  content,
}: {
  content: Localized<FamilyPageContent>;
}) {
  const { lang } = useLanguage();
  const c = content[lang];
  const [category, setCategory] = useState<FamilyCategory>("all");
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [video, setVideo] = useState<(typeof c.videos.items)[number] | null>(
    null,
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-family-reveal]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, [lang]);

  const filteredPhotos = useMemo(
    () =>
      category === "all"
        ? c.photos.items
        : c.photos.items.filter((item) => item.category === category),
    [c.photos.items, category],
  );
  const currentPhoto = photoIndex === null ? null : filteredPhotos[photoIndex];
  const movePhoto = (direction: number) => {
    if (photoIndex === null || filteredPhotos.length === 0) return;
    setPhotoIndex(
      (photoIndex + direction + filteredPhotos.length) % filteredPhotos.length,
    );
  };

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-[#f6f1ea] dark:bg-navy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,.8),transparent_35%),linear-gradient(120deg,rgba(246,241,234,.98)_0%,rgba(246,241,234,.82)_43%,rgba(7,20,38,.18)_100%)] dark:bg-[linear-gradient(120deg,rgba(7,15,29,.96),rgba(7,15,29,.45))]" />
        <div className="container relative grid min-h-[640px] items-center gap-10 pt-10 pb-16 lg:grid-cols-[.9fr_1.1fr] lg:py-20">
          <div data-family-reveal className="relative z-10 max-w-xl">
            <p className="eyebrow mb-5 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {c.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[.95] tracking-[-.04em] text-navy dark:text-white sm:text-7xl">
              {c.hero.title}
              <br />
              <span className="text-primary">{c.hero.accent}</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-navy/75 dark:text-white/75 sm:text-lg">
              {c.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group rounded-full px-6 transition-transform duration-300 ease-in-out hover:scale-[1.03]"
              >
                <a href="#moments">
                  {c.hero.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-full border-navy/20 bg-white/60 px-6 text-navy transition-transform duration-300 ease-in-out hover:scale-[1.03] dark:border-white/20 dark:bg-white/10 dark:text-white"
              >
                <a href="#videos">
                  <Play className="h-4 w-4 fill-current" />
                  {c.hero.videoCta}
                </a>
              </Button>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-navy/15 pt-5 dark:border-white/15">
              {[
                { icon: Heart, title: "Love", text: "Our foundation" },
                { icon: Users, title: "Togetherness", text: "Our strength" },
                { icon: Leaf, title: "Values", text: "Our inspiration" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-2">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy dark:text-white" />
                  <span className="text-xs text-navy/70 dark:text-white/70">
                    <strong className="block text-sm text-navy dark:text-white">
                      {title}
                    </strong>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            data-family-reveal
            className="relative min-h-[430px] lg:min-h-[600px]"
          >
            <div className="absolute inset-x-4 bottom-0 top-6 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/50 lg:inset-x-0">
              <Image
                src={c.photos.items[0]!.src}
                alt={c.hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <p className="absolute right-2 top-0 z-10 max-w-[180px] rotate-[-8deg] font-script text-3xl leading-none text-navy/80 dark:text-white/90">
              Family gives meaning to my mission
            </p>
          </div>
        </div>
      </section>

      <section
        id="moments"
        className="container relative z-10 -mt-8 rounded-3xl border bg-card/95 p-3 shadow-xl backdrop-blur"
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "flex items-center gap-3 rounded-2xl p-3 text-left transition-all hover:scale-[1.01]",
              category === "all"
                ? "bg-navy text-white"
                : "bg-muted/60 text-foreground",
            )}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15">
              <Camera className="h-5 w-5" />
            </span>
            <span>
              <strong className="block text-sm">{c.album.all}</strong>
              <small className="text-xs opacity-70">
                {c.photos.items.length} photos
              </small>
            </span>
          </button>
          {c.album.items.map((item) => (
            <button
              type="button"
              key={item.category}
              onClick={() => setCategory(item.category)}
              className={cn(
                "flex items-center gap-3 rounded-2xl p-3 text-left transition-all hover:scale-[1.01]",
                category === item.category
                  ? "bg-navy text-white"
                  : "bg-muted/60 text-foreground",
              )}
            >
              <Image
                src={item.image}
                alt=""
                width={52}
                height={52}
                className="h-11 w-11 rounded-xl object-cover"
              />
              <span>
                <strong className="block text-sm">{item.title}</strong>
                <small className="text-xs opacity-70">{item.text}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="container section-y">
        <div
          data-family-reveal
          className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow">{c.photos.eyebrow}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-navy dark:text-white sm:text-5xl">
              {c.photos.title}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {c.photos.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(c.photos.filters) as FamilyCategory[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all hover:scale-[1.03]",
                  category === key
                    ? "border-primary bg-primary text-white"
                    : "bg-card hover:border-primary/50",
                )}
              >
                {c.photos.filters[key]}
              </button>
            ))}
          </div>
        </div>
        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 lg:auto-rows-[210px]">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setPhotoIndex(index)}
              className={cn(
                "group relative overflow-hidden rounded-2xl text-left shadow-sm ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary",
                index === 0
                  ? "col-span-2 row-span-2"
                  : index === 3
                    ? "row-span-2"
                    : "",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {photo.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="videos" className="bg-muted/45 py-16">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{c.videos.eyebrow}</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-navy dark:text-white sm:text-5xl">
                {c.videos.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{c.videos.subtitle}</p>
            </div>
            <Button variant="outline" className="w-fit rounded-full">
              {c.videos.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.videos.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setVideo(item)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/35" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/35 text-white backdrop-blur transition group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
                <span className="absolute inset-x-4 bottom-4 text-sm font-semibold text-white">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-band py-20">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div data-family-reveal>
            <p className="eyebrow text-white/70">{c.story.eyebrow}</p>
            <h2 className="mt-3 max-w-md font-display text-4xl font-semibold text-white sm:text-5xl">
              {c.story.title}
            </h2>
            <p className="mt-5 max-w-lg text-white/70">{c.story.text}</p>
            <Button asChild variant="outline" className="mt-7 rounded-full">
              <a href="#values">
                {c.story.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
            <div className="relative min-h-[300px] overflow-hidden rounded-3xl">
              <Image
                src={c.photos.items[1]!.src}
                alt={c.photos.items[1]!.alt}
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className="relative min-h-[140px] overflow-hidden rounded-3xl">
                <Image
                  src={c.photos.items[3]!.src}
                  alt={c.photos.items[3]!.alt}
                  fill
                  loading="lazy"
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <blockquote className="rounded-3xl bg-white/10 p-6 text-xl text-white">
                “{c.story.quote}”
                <footer className="mt-4 font-script text-2xl text-white/80">
                  {c.story.author}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="container section-y">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">{c.values.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-navy dark:text-white sm:text-5xl">
              {c.values.title}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {c.values.text}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.values.items.map((item, index) => {
              const Icon = [Users, Heart, Leaf][index] ?? Heart;
              return (
                <div
                  key={item.title}
                  className="card-surface card-hover p-6 text-center"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-semibold text-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {currentPhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.ui.photo}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setPhotoIndex(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setPhotoIndex(null);
            if (event.key === "ArrowLeft") movePhoto(-1);
            if (event.key === "ArrowRight") movePhoto(1);
          }}
          tabIndex={0}
        >
          <button
            type="button"
            aria-label={c.ui.close}
            onClick={() => setPhotoIndex(null)}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X />
          </button>
          <button
            type="button"
            aria-label={c.ui.previous}
            onClick={(event) => {
              event.stopPropagation();
              movePhoto(-1);
            }}
            className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft />
          </button>
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            width={currentPhoto.width}
            height={currentPhoto.height}
            priority
            className="max-h-[88vh] w-auto max-w-[88vw] rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            aria-label={c.ui.next}
            onClick={(event) => {
              event.stopPropagation();
              movePhoto(1);
            }}
            className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight />
          </button>
        </div>
      ) : null}
      {video ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.ui.video}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setVideo(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setVideo(null);
          }}
          tabIndex={0}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={c.ui.close}
              onClick={() => setVideo(null)}
              className="absolute -right-2 -top-14 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X />
            </button>
            <video
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[80vh] w-full rounded-xl bg-black object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
