import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)
  // necesitamos guardar la posicion del mouse
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      // siempre el evento trae clientY y clientX porque esta la data de donde esta el puntero en pantalla
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    // agrego al evento pointermove, la funcion handleMove generada para trackear el mov del mouse
    if (enabled) {
      // solo si el enabled es true, si queremos seguir el puntero
      window.addEventListener('pointermove', handleMove)
    }
  }, [enabled])
  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
