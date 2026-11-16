import BlurPage from '@/components/global/blur-page'
import React from 'react'

type Props = {
  params: { subaccountId: string }
}

const AutomationsPage = async ({ params }: Props) => {
  return (
    <BlurPage>
      <h1 className="text-4xl p-4">Automations</h1>
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground text-lg">
          Automations are coming soon.
        </p>
      </div>
    </BlurPage>
  )
}

export default AutomationsPage
