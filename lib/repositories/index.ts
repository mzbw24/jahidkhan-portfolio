import type { ContentRepository } from "@/types/repository";
import { localContentRepository } from "./local-content-repository";

export const contentRepository: ContentRepository = localContentRepository;
