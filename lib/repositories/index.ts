import type { ContentRepository } from "@/types/repository";
import { localContentRepository } from "./local-content-repository";

/**
 * The ONE place that decides where content comes from.
 * To move to a backend, implement `ContentRepository` (e.g. fetch from an API/CMS)
 * and export it here instead.
 */
export const contentRepository: ContentRepository = localContentRepository;
