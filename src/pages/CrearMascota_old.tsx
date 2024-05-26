import React, { useState } from 'react'

export const CrearMascota: React.FC = () => {

  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);
  const [namePet, setNamePet] = useState<string>("");
  const [pet, setPets] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  //const [imageFilename, setImageFilename] = useState<string>("");



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNewPet = await fetch(`http://localhost:3006/api/v1/pets`,
      // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpZFVzZXIiOjEsImlhdCI6MTcxNjY3Nzc1MSwiZXhwIjoxNzE2NjgxMzUxfQ.zxCxtJHTaFeTNDyPIzN_dTNl_5Bdrtn9ydeZU8pvcvY`,
        },
        body: JSON.stringify({
          namePet,
          pet,
          age,
          description,
          //  imageFilename,
        }),
      }
    );

    const responseAPI = await responseNewPet.json();

    if (!responseNewPet.ok) {
      // Verificar si responseAPI.message es un string
      console.log(responseAPI.message);
      if (typeof responseAPI.message === 'string') {
        setMessage(responseAPI.message.split(","));
      } else if (Array.isArray(responseAPI.message)) {
        // Si responseAPI.message es un array, asumimos que ya contiene mensajes separados
        setMessage(responseAPI.message);
      } else {
        // Si responseAPI.message es un objeto, tratamos de obtener sus valores
        setMessage(Object.values(responseAPI.message));
      }
      return;
    }
    /*
    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    if (status === "loading") {
      return <div className="loader-container"><div className="loader"></div> <div className="loader2"></div></div>;
    }

    router.push("/dashboard");
    */
  };

  return (
    <>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="test"
          name="namePets"
          className="form-control mb-2"
          value={namePet}
          onChange={(event) => setNamePet(event.target.value)}
        />

        <span>Tipo de mascota</span>
        <select className="form-select" onChange={(event) => setPets(event.target.value)}>
          <option value={0}>
            SELECCIONE OPCIÓN
          </option>
          <option value={1}>
            GATO
          </option>
          <option value={2}>
            PERRO
          </option>
          <option value={3}>
            AVE
          </option>
        </select>

        <input
          type="number"
          placeholder="test@test.com"
          name="age"
          className="form-control mb-2"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <textarea
          placeholder="Contenido"
          name="content"
          className="form-control mb-2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="mb-3">
          <label htmlFor="formFile" >Default file input example</label>
          <input className="form-control" type="file" id="formFile" />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          crear mascota
        </button>
      </form>

      {message.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {message.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

    </>
  )
}
