export const mockSteps = [
  { name: "", label: "Placing an ad on Google/Facebook Ads" },
  { name: "", label: "Placing an ad on Google/Facebook Ads" },
  { name: "", label: "Prospect navigates to page with ad" },
  { name: "", label: "Prospect sees ad (might be possible?)" },
  { name: "", label: "Prospect clicks on add" },
  { name: "prospect_reached_landing_page", label: "Prospect is taken to landing page" },
  { name: "prospect_learns_more", label: "... (read about our product, maybe some A/B testing here)" },
  { name: "prospect_clicked_buy", label: "User clicks on Buy/Order button" },
  { name: "", label: "User fills in personal details" },
  { name: "", label: "User fills in credit card details" },
  { name: "", label: "User completes purchase" },
  { name: "", label: "User posts our ads to their social media"}
].map(
  step => ({...step, description: step.label, completed: false})
);
