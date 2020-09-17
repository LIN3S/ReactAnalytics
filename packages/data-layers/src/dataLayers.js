let dls = [];

const pushDL = dl => {
  if (typeof window === 'undefined' || typeof window.dataLayer === 'undefined') {
    return;
  }

  window.dataLayer.push(dl);
};

const queueDataLayer = dataLayer => dls.push(dataLayer);

const pushDataLayer = dataLayer => pushDL(dataLayer);

const pushPageLoadDataLayer = (eventName = 'pageview') => {
  pushDL({event: eventName});
};

const flush = () => {
  dls.map(pushDL);
  dls = [];
};

export {
  queueDataLayer,
  pushDataLayer,
  pushPageLoadDataLayer,
  flush,
};
