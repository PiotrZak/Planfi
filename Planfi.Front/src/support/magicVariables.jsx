export const repeatsToChange = 1;
export const timesToChange = 30;
export const seriesToChange = 1;
export const weightToChange = 5;

// 10 mb
export const maxPhotoSize = 10000000;
// 30 mb
export const maxVideoSize = 30000000;

export const acceptedImageFileType = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
export const acceptedVideoFileType = [
  "video/mp4",
  "video/mov",
  "video/avi",
  "video/quicktime",
];

export const acceptedFiles =acceptedImageFileType.concat(acceptedVideoFileType)

export const Breakpoints = {
  desktop: {
    breakpoint: { max: 5000, min: 768 },
    items: 1,
  },
  laptop: {
    breakpoint: { max: 1024, min: 0 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};