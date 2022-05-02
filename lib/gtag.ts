export const GA_TRACKING_ID = process.env.GA_TRACKING_ID || process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (params: {
  event_name: string;
  params: Record<string, string | boolean | number>;
}) => {
  window.gtag('event', params.event_name, params);
};
