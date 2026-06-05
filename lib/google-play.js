/*
 * lib/google-play.js
 *
 * Helpers for verifying Google Play subscription purchases.
 *
 * Environment variables expected (server-only):
 * - GOOGLE_PLAY_SERVICE_ACCOUNT_KEY  (JSON string of a service account)
 * - PLAY_VERIFY_MODE (optional) — set to 'mock' for local/dev testing
 *
 * Notes:
 * - This file provides a small wrapper around the googleapis client.
 * - Install with: `npm i googleapis`
 */

export async function verifySubscriptionPurchase({ packageName, subscriptionId, purchaseToken }) {
  if (process.env.PLAY_VERIFY_MODE === 'mock') {
    return {
      success: true,
      data: {
        mock: true,
        packageName,
        subscriptionId,
        purchaseToken,
        expiryTimeMillis: String(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    };
  }

  if (!process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY) {
    return { success: false, error: 'GOOGLE_PLAY_SERVICE_ACCOUNT_KEY not set' };
  }

  let google;
  try {
    google = await import('googleapis');
  } catch (err) {
    return { success: false, error: "googleapis not installed. Run `npm i googleapis`" };
  }

  const { google: googleClient } = google;
  let credentials;
  try {
    credentials = JSON.parse(process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY);
  } catch (err) {
    return { success: false, error: 'Failed to parse GOOGLE_PLAY_SERVICE_ACCOUNT_KEY JSON' };
  }

  try {
    const auth = new googleClient.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/androidpublisher']
    });

    const authClient = await auth.getClient();
    const androidpublisher = googleClient.androidpublisher({ version: 'v3', auth: authClient });

    const res = await androidpublisher.purchases.subscriptions.get({
      packageName,
      subscriptionId,
      token: purchaseToken
    });

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.message || String(err), details: err?.response?.data || null };
  }
}
