import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/lib/constants'
import { stripe } from '@/lib/stripe'
import clsx from 'clsx'
import { Check, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  })

  return (
    <>
      <section className="h-full w-full md:pt-80  relative flex items-center justify-center flex-col overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <p className="text-center text-lg text-muted-foreground tracking-wide uppercase">
          Run your agency, in one place
        </p>
        <div className="relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px] text-white/[0.07] select-none pointer-events-none">
            Plura
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-20px]">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>

      {/* Gradient divider */}
      <div className="w-full flex justify-center md:mt-10 mt-[-40px] relative z-20">
        <div className="h-[1px] w-2/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-8 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background -z-10" />

        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not ready to commit you can get started for free.
        </p>

        <div className="flex justify-center gap-6 flex-wrap mt-10">
          {/* Starter Card (free) */}
          <Card
            className={clsx(
              'w-[300px] flex flex-col justify-between',
              'bg-background/50 border-border/50 backdrop-blur-sm',
              'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'
            )}
          >
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                {pricingCards[0].title}
              </CardTitle>
              <CardDescription>{pricingCards[0].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground"> / month</span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div className="flex flex-col gap-2">
                {pricingCards
                  .find((c) => c.title === 'Starter')
                  ?.features.map((feature) => (
                    <div key={feature} className="flex gap-2 items-center">
                      <Check className="text-muted-foreground" size={18} />
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
              </div>
              <Link
                href="/agency"
                className="w-full text-center p-2 rounded-md border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>

          {/* Paid cards from Stripe */}
          {prices.data.map((card) => {
            const cardInfo = pricingCards.find(
              (c) => c.title === card.nickname || c.priceId === card.id
            )
            const isUnlimited = cardInfo?.title === 'Unlimited Saas'

            return (
              <Card
                key={card.nickname}
                className={clsx(
                  'w-[300px] flex flex-col justify-between relative',
                  'hover:scale-[1.02] transition-all duration-300',
                  isUnlimited
                    ? 'w-[320px] border-0 bg-gradient-to-b from-primary/20 via-background to-background shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 ring-1 ring-primary/50'
                    : 'bg-background/50 border-border/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5'
                )}
              >
                {isUnlimited && (
                  <>
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-20 -z-10 blur-sm" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-primary to-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-primary/30">
                        <Zap size={12} fill="currentColor" />
                        Most Popular
                      </span>
                    </div>
                  </>
                )}
                <CardHeader className={isUnlimited ? 'pt-8' : ''}>
                  <CardTitle
                    className={clsx(
                      isUnlimited
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {card.nickname}
                  </CardTitle>
                  <CardDescription>{cardInfo?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">
                    ${card.unit_amount && card.unit_amount / 100}
                  </span>
                  <span className="text-muted-foreground">
                    {' '}/ {card.recurring?.interval}
                  </span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex flex-col gap-2">
                    {cardInfo?.features.map((feature) => (
                      <div key={feature} className="flex gap-2 items-center">
                        <Check
                          className={
                            isUnlimited ? 'text-primary' : 'text-muted-foreground'
                          }
                          size={18}
                        />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/agency?plan=${card.id}`}
                    className={clsx(
                      'w-full text-center p-2.5 rounded-md font-medium transition-all duration-200',
                      isUnlimited
                        ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110'
                        : 'bg-primary text-white hover:bg-primary/90'
                    )}
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </>
  )
}
