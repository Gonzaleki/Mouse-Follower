import { useEffect, useState } from 'react'

const FollowMouse = () => {
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
      // necesitamos limpiar el efecto sino seguira suscrito siempre
    }

    // este metodo se ejecutara siempre que se desmonte el componente
    // que no aparezca mas, no se renderice mas. Ahi entra en uso este metodo.
    // Si cambia la dependencia tambien ejecuta este metodo para limpiar el efecto anterior antes de
    // ejecutar el nuevo
    console.log('useeffect')
    return () => {
      console.log('cleanup')

      window.removeEventListener('pointermove', handleMove)
      // para ver acumulacion de suscripciones usar getEventListeners(window) y nos da un array con la data
    }
  }, [enabled])
  return (
    <>
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
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
