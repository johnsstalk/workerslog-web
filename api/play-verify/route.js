import { verifySubscriptionPurchase } from '../../lib/google-play.js';
import { upsertSubscription } from '../../lib/supabase.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { packageName, subscriptionId, purchaseToken, userId } = body || {};
    if (!packageName || !subscriptionId || !purchaseToken) {
      return new Response(JSON.stringify({ error: 'packageName, subscriptionId and purchaseToken required' }), { status: 400 });
    }

    const verification = await verifySubscriptionPurchase({ packageName, subscriptionId, purchaseToken });
    if (!verification.success) {
      return new Response(JSON.stringify({ verified: false, error: verification.error, details: verification.details || null }), { status: 200 });
    }

    const pdata = verification.data || {};
    const upsertPayload = {
      user_id: userId || null,
      subscription_id: pdata.orderId || purchaseToken,
      product_id: subscriptionId,
      purchase_token: purchaseToken,
      status: pdata.autoRenewing ? 'active' : (pdata.cancelReason ? 'cancelled' : 'unknown'),
      expiry_time: pdata.expiryTimeMillis ? new Date(Number(pdata.expiryTimeMillis)).toISOString() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      await upsertSubscription(upsertPayload);
    } catch (err) {
      console.error('Upsert subscription error', err);
    }

    return new Response(JSON.stringify({ verified: true, data: pdata }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}
