import type { YisCategory } from "@/types/yis";

/**
 * One row per file in /public/images/ys (ys (N).jpeg; there is no ys (7)). Captions only describe what is
 * visible; no names, dates, places or outcomes are claimed.
 */
type Row = readonly [n: number, category: YisCategory, title: string];

export const yisGalleryRows: readonly Row[] = [
  [1, "programs", "Students lined up along a school path"],
  [2, "gatherings", "Welcome with garlands"],
  [3, "public", "Crowd gathered outdoors"],
  [4, "public", "Large crowd near a building"],
  [5, "sports", "Team group photo with a banner"],
  [6, "sports", "Team in matching jerseys with a banner"],
  [8, "sports", "Scouts and guests with a crest at a table"],
  [9, "sports", "Scouts and guests gathered around a table"],
  [10, "recognition", "Awards display with a group on stage"],
  [11, "recognition", "Honouring ceremony with a crest"],
  [12, "recognition", "Honour banner graphic"],
  [13, "gatherings", "Group photo at an indoor gathering"],
  [14, "gatherings", "Group photo at an indoor gathering — second frame"],
  [15, "gatherings", "Large group photo at a gathering"],
  [16, "gatherings", "Group photo with a selfie in the foreground"],
  [17, "gatherings", "Seated group at a meeting"],
  [18, "gatherings", "Seated group at a meeting — second frame"],
  [19, "recognition", "Presenting a gift at an event"],
  [20, "gatherings", "Group photo at an event hall"],
  [21, "recognition", "Gifts presented at an event table"],
  [22, "recognition", "Handing over a bouquet under a banner"],
  [23, "recognition", "Bouquet presentation at an event"],
  [24, "public", "Road-safety signs poster"],
  [25, "gatherings", "Group photo in a shop-style room"],
  [26, "recognition", "Gift exchange at an event"],
  [27, "gatherings", "Group photo in a hall"],
  [28, "gatherings", "Group photo in a hall — second frame"],
  [29, "programs", "Children dressed up at a program"],
  [30, "programs", "Students and guests at a flower-decked stage"],
  [31, "programs", "Students seated on stage at a program"],
  [32, "programs", "Stage program with students and guests"],
  [33, "gatherings", "Group selfie indoors"],
  [34, "gatherings", "Group selfie indoors — second frame"],
  [35, "programs", "Stage program with a crest presentation"],
  [36, "programs", "Stage program — guests and students"],
  [37, "programs", "Receiving a crest at the stage"],
  [38, "programs", "Students and guests on stage"],
  [39, "recognition", "Holding a crest under the event banner"],
  [40, "programs", "Wide view of a stage program"],
  [41, "programs", "Crest displayed on the stage table"],
  [42, "programs", "Children and guests at a program"],
  [43, "programs", "Guests gathered beside the stage"],
  [44, "programs", "Attendees near the stage"],
  [45, "public", "Group selfie at an outdoor monument"],
  [46, "public", "Group photo at an outdoor monument"],
  [47, "public", "Evening procession with flags"],
  [48, "public", "Evening procession with flags — second frame"],
  [49, "public", "Street gathering at night"],
  [50, "recognition", "Presenting a gift under an event banner"],
  [51, "sports", "Scouts saluting outdoors"],
  [52, "sports", "Scouts and guests with a certificate"],
];

/** Hero slider images, in order (all landscape group/event photos). */
export const yisHeroNumbers = [15, 47, 5, 10, 46, 30, 45] as const;

/** "Activities in pictures" strip. */
export const yisHighlightNumbers = [15, 5, 10, 22, 47, 30, 46, 8, 13, 38] as const;

/** Representative image per activity card. */
export const yisCoverNumbers = { gatherings: 27, recognition: 22, programs: 30, sports: 5, public: 47 } as const;

export const yisOgPhotoNumber = 15;
