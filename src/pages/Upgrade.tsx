import { CheckCircle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/api';

export default function Upgrade() {
  const isSubscribed = localStorage.getItem('subscribed') === 'true';

  const handleUpgrade = async () => {
  try {
    
    const res = await api.post(
      '/api/payment/create-order',
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const order = res.data; 

    const options = {
      key: 'rzp_test_RtwnS0QXvCxB1H',
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'NutriTrack Premium',
      description: 'Unlimited nutrition tracking',

      handler: async function (response: any) {
        
        await api.post('/api/payment/verify', response, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        localStorage.setItem('subscribed', 'true');
        alert('🎉 You are now a Premium user!');
        window.location.href = '/app';
      },

      modal: {
        ondismiss: function () {
          
          console.log('Payment popup closed by user');
          alert('Payment cancelled. You can upgrade anytime.');

          
          api.post(
            '/api/payment/cancel',
            { orderId: order.orderId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
        },
      },
    };
    // @ts-ignore
    new window.Razorpay(options).open();
  } catch (err) {
    console.error('Payment failed', err);
    alert('Payment failed. Please try again.');
  }
};

  if (isSubscribed) {
    return (
      <div className="container mx-auto max-w-xl py-20 text-center">
        <Crown className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">You’re already Premium 🎉</h2>
        <p className="text-muted-foreground mt-2">
          Enjoy unlimited access to all features.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-16">
      <div className="text-center mb-12">
        <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
        <p className="text-muted-foreground mt-2">
          Unlock the full power of NutriTrack 🚀
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Premium Benefits
        </h2>

        <ul className="space-y-4 mb-8">
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5" />
            Unlimited API usage (no rate limits)
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5" />
            Advanced nutrition analytics
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5" />
            Priority support
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5" />
            Early access to new features
          </li>
        </ul>

        <div className="text-center">
          <p className="text-3xl font-bold mb-2">₹199 / month</p>
          <p className="text-sm text-muted-foreground mb-6">
            Cancel anytime. No hidden charges.
          </p>

          <Button
            size="lg"
            className="rounded-xl px-10"
            onClick={handleUpgrade}
          >
            Upgrade Now 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}
