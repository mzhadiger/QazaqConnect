Qazaq Connect — Design Refresh (Static Template)

Files:
- index.html
- styles.css
- script.js

Quick setup:
1) Add your real upcoming Partiful links:
   - Open script.js and update PARTIFUL_EVENTS[].partifulUrl
   - Optional but recommended: add startISO/endISO (+ rsvpDeadlineISO)
     This unlocks the "Next speaking club" hero banner + calendar view.

2) Real-time Instagram feed (recommended):
   - Set IG_FEED_ENDPOINT in script.js to your own endpoint that returns:
       { "posts": [ { "permalink": "...", "media_url": "...", "caption": "...", "timestamp": "..." } ] }
   - If you don’t have an endpoint yet, you can use embed mode:
     Add public post permalinks to INSTAGRAM_POSTS[].

3) Replace images with real event photos:
   - assets/hero-1.jpg ... hero-4.jpg
   - assets/g-1.jpg ... g-6.jpg
   - assets/team-1.jpg ... team-3.jpg
   - assets/partner-1.png ... partner-3.png

4) Donate button:
   - Set DONATE_URL in script.js, or keep blank to point to #support.

5) Analytics (optional):
   - Set GA4_MEASUREMENT_ID in script.js to enable GA4 tracking.

6) Floating community widget:
   - Appears bottom-right with Telegram/WhatsApp links (+ optional counts).
   - Counts come from COMMUNITY_STATS_ENDPOINT.
