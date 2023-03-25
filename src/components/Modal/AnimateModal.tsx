import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  keyBody: string
}

const AnimateModal: FC<Props> = ({ children, keyBody }) => {
  return (
    <motion.div
      initial={{ opacity: .5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
      className='absolute w-screen h-screen top-0 bg-[rgba(19,19,19,0.36)] flex p-3'
    >
      <motion.div
        key={keyBody}
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .2, ease: [0, 0.71, 0.2, 1.01] }}
        exit={{ opacity: 0, y: 80, transition: { duration: 0.2, ease: "easeOut" } }}
        className='m-auto bg-slate-200 rounded-md w-full max-w-[600px] min-h-[400px] overflow-hidden'
      >
        {
          children
        }
      </motion.div>
    </motion.div>
  )
}

export default AnimateModal