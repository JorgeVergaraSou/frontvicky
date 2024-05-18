import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/UserProvider'

export const Login: React.FC = () => {
  const { user, handleLogin, handleLogout } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const initialUrl = 'https://66130b6353b0d5d80f66c80e.mockapi.io/api/v1/users'

  const fetchUsers = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers(initialUrl)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const user = users.find(u => u.name === username && u.password === password)

    if (user) {
      handleLogin(user) // Pass the user object
      setError('¡Inicio de sesión exitoso!')
    } else {
      setError('Nombre de usuario o contraseña incorrectos')
    }
  }

  return (
    <>
      <div>
        {user ? (
          <div>
            <h2 className='text-center'>¡Gracias por visitarnos!</h2>
            <div className='text-success'>
              <hr />
            </div>
            <button
              className='btn btn-primary mx-1'
              type='button'
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div>
            <h2 className='text-center'>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Usuario
                </label>
                <input
                  name='name'
                  id='name'
                  className='form-control'
                  type='text'
                  placeholder='Nombre de usuario'
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Contraseña
                </label>
                <input
                  name='password'
                  id='password'
                  className='form-control'
                  type='password'
                  placeholder='Contraseña'
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Iniciar sesión
              </button>
              {error && <p>{error}</p>}
            </form>
          </div>
        )}
      </div>
    </>
  )
}
