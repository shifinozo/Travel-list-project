import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink/70 z-[100] flex items-center justify-center px-6"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-ivory rounded-2xl shadow-premium border border-gold/20 w-full max-w-sm p-6"
          >
            <h3 className="font-serif text-xl font-semibold text-ink mb-2">{title}</h3>
            <p className="text-ink/60 text-sm mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-full text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-ink text-gold hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConfirmDialog
