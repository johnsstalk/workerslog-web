import { upsertSubscription } from '../../lib/supabase.js';

export async function POST(request) {
  try {
    const body = await request.json();
    // RTDN is frequently wrapped in Pub/Sub push format: { message: { data: 'base64' } }
    let decoded = body;
    if (body && body.message && body.message.data) {
      try {
        const decodedStr = Buffer.from(body.message.data, 'base64').toString('utf8');
        decoded = JSON.parse(decodedStr);
      } catch (e) {
        decoded = { raw: body.message.data };
      }
    }

    const packageName = decoded.packageName || decoded.package_name || decoded.data?.packageName;
    const subscriptionId = decoded.subscriptionId || decoded.subscription_id || decoded.data?.subscriptionId;
    const purchaseToken = decoded.purchaseToken || decoded.purchase_token || decoded.data?.purchaseToken;
    const notificationType = decoded.notificationType || decoded.notification_type || decoded.eventType || null;

    console.log('RTDN received', { packageName, subscriptionId, purchaseToken, notificationType, raw: decoded });

    // TODO: map notificationType to subscription lifecycle and upsert properly.
    if (purchaseToken && subscriptionId) {
      try {
        await upsertSubscription({
          user_id: null,
          subscription_id: `${subscriptionId}:${purchaseToken}`,
          product_id: subscriptionId,
          purchase_token: purchaseToken,
          status: 'rtdn',
          expiry_time: null,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.error('RTDN upsert error', err);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}
