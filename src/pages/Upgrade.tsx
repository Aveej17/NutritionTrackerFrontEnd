import { CheckCircle, Crown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Upgrade() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const isSubscribed = user?.isPremium;

  const handleUpgrade = async () => {
    try {
      const res = await api.post('/api/payment/create-order');
      const order = res.data;

      const options = {
        key: 'rzp_test_RtwnS0QXvCxB1H',
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'NutriTrack Premium',
        description: 'Unlimited nutrition tracking',

        handler: async function (response: any) {
          // verify payment
          const verifyRes = await api.post(
            '/api/payment/verify',
            response
          );

          await login(verifyRes.data);
          navigate('/app');
        },

        modal: {
          ondismiss: function () {
            alert('Payment cancelled. You can upgrade anytime.');
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

  /* =======================
     Already premium
  ======================= */
  if (isSubscribed) {
    return (
      <div className="container mx-auto max-w-xl py-20 text-center">
        <Crown className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">You’re already Premium 🎉</h2>
        <p className="text-muted-foreground mt-2">
          Enjoy unlimited access to all features.
        </p>

        <Button
          variant="ghost"
          className="mt-6 flex items-center gap-2 mx-auto"
          onClick={() => navigate('/app')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Button>
      </div>
    );
  }

  /* =======================
     Upgrade UI
  ======================= */
  return (
    <div className="container mx-auto max-w-4xl py-16">
      {/* Back button */}
      <button
        onClick={() => navigate('/app')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to App
      </button>

      <div className="text-center mb-12">
        <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
        <p className="text-muted-foreground mt-2">
          Unlock the full power of NutriTrack
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
            Custom daily nutrition goals
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5" />
            Advanced analytics & insights
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
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
