import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false })
mermaid.parseError = () => {}

interface MermaidSvgProps {
  code: string
  syncWithCode: boolean
  onError?: (msg: string | undefined) => any
}

export function MermaidSvg({ code, syncWithCode, onError }: MermaidSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ignore = false
    if (!syncWithCode) return
    if (!code) return
    mermaid
      .parse(code)
      .then(() =>
        mermaid.render('diagram', code).then(({ svg, bindFunctions }) => {
          if (ignore) return
          if (!containerRef.current) return
          containerRef.current.innerHTML = svg
          onError?.(undefined)
          if (bindFunctions) {
            bindFunctions(containerRef.current)
          }
        }),
      )
      .catch((e) => {
        onError?.(e.message)
      })

    return () => {
      ignore = true
    }
  }, [syncWithCode, code])

  return <div ref={containerRef} id="diagram-container"></div>
}
