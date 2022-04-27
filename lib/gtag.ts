export const GA_TRACKING_ID = process.env.GA_TRACKING_ID || process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (params: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  window.gtag('event', params.action, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
  });
};
