export const mockSteps = [
  { name: "", label: "Placing an ad on Google/Facebook Ads" },
  { name: "", label: "Placing an ad on Google/Facebook Ads" },
  { name: "", label: "Prospect navigates to page with ad" },
  { name: "", label: "Prospect sees ad (might be possible?)" },
  { name: "", label: "Prospect clicks on ad" },
  { name: "prospect_reached_landing_page", label: "Prospect is taken to landing page" },
  { name: "prospect_learns_more", label: "... (read about our product, maybe some A/B testing here)" },
  { name: "prospect_clicked_buy", label: "User clicks on Buy/Order button" },
  { name: "prospect_enters_contact_details", label: "User fills in personal details" },
  { name: "prospect_attempts_payment", label: "User submitted credit card details" },
  { name: "customer_completed_payment", label: "User completes purchase" },
  { name: "", label: "User posts our ads to their social media"}
].map(
  step => ({...step, description: step.label, completed: false})
);
