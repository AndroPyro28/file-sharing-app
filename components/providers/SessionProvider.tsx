import { SessionProvider as SessionProviderComp, useSession } from '@hono/auth-js/react'

export default function SessionProvider({ children }: React.PropsWithChildren) {
  return (
    <SessionProviderComp>
        {children}
    </SessionProviderComp>
  )
}