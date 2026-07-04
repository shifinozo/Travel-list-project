import React from 'react'

function StarRating({ value = 0, onChange, size = 'text-base' }) {
  const stars = [1, 2, 3, 4, 5]
  const interactive = typeof onChange === 'function'

  return (
    <div className={`flex gap-0.5 ${size}`}>
      {stars.map((n) => (
        <span
          key={n}
          onClick={interactive ? () => onChange(n === value ? 0 : n) : undefined}
          className={`${interactive ? 'cursor-pointer' : ''} ${
            n <= value ? 'text-gold' : 'text-ink/20'
          }`}
          role={interactive ? 'button' : undefined}
          aria-label={interactive ? `Rate ${n} star${n > 1 ? 's' : ''}` : undefined}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
