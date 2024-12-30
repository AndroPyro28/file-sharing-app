"use client"
import { useActiveView } from '@/hooks/use-active-view'
import React from 'react'
import { TransferView } from './transfer-view'
import { AnimatePresence, motion} from 'motion/react'
import { ContactView } from './contact-view'

export const View = () => {
    const {type} = useActiveView()
  return (
    <AnimatePresence>
        
        {
          type === "transfers" && <TransferView />
        }

        {
          type === "contacts" && <ContactView />
        }

    </AnimatePresence>
  )
}

