import { ref, onMounted, reactive } from 'vue';

export function createVwoPlugin({ defaultCampaignId = 1 } = {}) {
  const state = reactive({
    variation: ref(1),
    isLoaded: ref(false),
    campaignId: defaultCampaignId,
  });

  const detectFromCookie = (campaignId) => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('_vwo_uuid'));
    if (cookie) {
      const hash = cookie.split('=')[1];
      const hashNum = parseInt(hash.slice(-8), 16);
      const campaign = window._vwo_exp?.[campaignId];
      const variationCount = campaign?.comb_n
        ? Object.keys(campaign.comb_n).filter(k => k !== '__transferData').length
        : 3;
      return (hashNum % variationCount) + 1;
    }
    return 1;
  };

  const init = (campaignId = defaultCampaignId) => {
    state.campaignId = campaignId;
    state.variation = ref(1);
    state.isLoaded = ref(false);

    window.VWO = window.VWO || [];
    window.VWO.push([
      'onVariationApplied',
      (data) => {
        const [, expId, varId] = data;
        if (expId == campaignId) {
          state.variation = varId;
          state.isLoaded = true;
        }
      },
    ]);

    setTimeout(() => {
      if (!state.isLoaded) {
        state.variation = detectFromCookie(campaignId);
        state.isLoaded = true;
      }
    }, 2000);
  };

  return {
    install(app) {
      init();
      app.config.globalProperties.$vwo = state;
      app.provide('vwo', state);
    },
  };
}
