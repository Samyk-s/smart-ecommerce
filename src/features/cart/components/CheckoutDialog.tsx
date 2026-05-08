import { useState } from 'react'
import { CheckCircle2, CreditCard, Loader2, MapPin, PackageCheck, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { toast } from '@/shared/hooks/use-toast'

interface CheckoutDialogProps {
  subtotal: number
  shipping: number
  total: number
  totalItems: number
  onClose: () => void
  onComplete: () => void
}

type CheckoutStep = 'form' | 'processing' | 'success'

export function CheckoutDialog({
  subtotal,
  shipping,
  total,
  totalItems,
  onClose,
  onComplete,
}: CheckoutDialogProps) {
  const [step, setStep] = useState<CheckoutStep>('form')
  const [orderNumber] = useState(() => `SE-${Math.floor(100000 + Math.random() * 900000)}`)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStep('processing')

    window.setTimeout(() => {
      onComplete()
      setStep('success')
      toast({
        title: 'Checkout successful',
        description: `Order ${orderNumber} has been placed successfully.`,
        variant: 'success',
      })
    }, 1100)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl shadow-black/25">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close checkout"
          className="absolute right-4 top-4 z-10 rounded-full"
          onClick={onClose}
        >
          <X />
        </Button>

        {step === 'success' ? (
          <SuccessStep orderNumber={orderNumber} total={total} onClose={onClose} />
        ) : (
          <div className="grid lg:grid-cols-[1fr_280px]">
            <form className="p-6 sm:p-8" onSubmit={handleSubmit}>
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#075da4]">
                  Dummy checkout
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950">
                  Complete your order
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Enter sample details to preview the checkout experience.
                </p>
              </div>

              <fieldset disabled={step === 'processing'} className="space-y-6">
                <section>
                  <div className="mb-4 flex items-center gap-2 text-base font-bold text-zinc-950">
                    <MapPin className="size-5 text-[#075da4]" />
                    Shipping details
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="checkout-name">Full name</Label>
                      <Input id="checkout-name" required placeholder="Jane Doe" className="h-11" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="checkout-phone">Phone</Label>
                      <Input id="checkout-phone" required placeholder="9800000000" className="h-11" />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Label htmlFor="checkout-address">Address</Label>
                      <Input id="checkout-address" required placeholder="Street, city, province" className="h-11" />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-4 flex items-center gap-2 text-base font-bold text-zinc-950">
                    <CreditCard className="size-5 text-[#f7941d]" />
                    Payment method
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <label className="flex items-center gap-3 text-sm font-semibold text-zinc-800">
                      <input type="radio" name="payment" defaultChecked />
                      Cash on delivery
                    </label>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This is a dummy checkout, so no real payment is collected.
                    </p>
                  </div>
                </section>
              </fieldset>

              <Button
                type="submit"
                size="lg"
                disabled={step === 'processing'}
                className="mt-7 h-12 w-full bg-black text-base font-semibold text-white hover:bg-black/85"
              >
                {step === 'processing' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <PackageCheck />
                )}
                {step === 'processing' ? 'Placing order...' : 'Place dummy order'}
              </Button>
            </form>

            <aside className="border-t bg-[linear-gradient(180deg,#f8fbff_0%,#fff7ed_100%)] p-6 lg:border-l lg:border-t-0">
              <h3 className="text-lg font-extrabold text-zinc-950">Order review</h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="font-semibold">{totalItems}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-semibold text-[#075da4]">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t pt-3 text-base">
                  <dt className="font-bold">Total</dt>
                  <dd className="text-xl font-extrabold">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

interface SuccessStepProps {
  orderNumber: string
  total: number
  onClose: () => void
}

function SuccessStep({ orderNumber, total, onClose }: SuccessStepProps) {
  return (
    <div className="flex min-h-[460px] flex-col items-center justify-center p-8 text-center">
      <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-blue-50 text-[#075da4]">
        <CheckCircle2 className="size-11" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#075da4]">
        Order placed
      </p>
      <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-950">
        Checkout successful
      </h2>
      <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
        Your dummy order has been confirmed. Use this screen to show the expected checkout completion flow.
      </p>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4">
        <p className="text-sm text-muted-foreground">Order number</p>
        <p className="text-xl font-extrabold text-zinc-950">{orderNumber}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Total paid: <span className="font-bold text-zinc-950">${total.toFixed(2)}</span>
        </p>
      </div>
      <Button
        size="lg"
        className="mt-7 h-11 bg-black px-8 text-base font-semibold text-white hover:bg-black/85"
        onClick={onClose}
      >
        Back to shop
      </Button>
    </div>
  )
}
