import React, { useEffect, useState } from 'react';

interface Breed {
  idBreed: number;
  nameBreed: string;
}

const CrearMascota: React.FC<{ postId: number | null }> = ({ postId }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [namePets, setNamePets] = useState<string>("");
  const [pet, setPets] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    // Obtener las razas del backend
    const fetchBreeds = async () => {
      try {
        const response = await fetch('http://localhost:3006/api/v1/breeds');
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        setErrors(['Error fetching breeds']);
      }
    };

    fetchBreeds();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    if (!file) {
      setErrors(['Please select a file.']);
      return;
    }
    if (postId === null) {
      console.error("No se puede crear la mascota sin un postId");
      return;
  }
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Enviar el archivo al backend
      const response = await fetch('http://localhost:3006/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors([data.message || 'Error uploading file']);
        return;
      }

      // Enviar el nombre del archivo junto con los demás datos al backend
      const petData = {
        namePets,
        pet,
        age,
        description,
        imageFilename: data.filename,
      };

      const responseNewPet = await fetch('http://localhost:3006/api/v1/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer tu_token_aqui`,
        },
        body: JSON.stringify(petData),
      });

      const responseAPI = await responseNewPet.json();

      if (!responseNewPet.ok) {
        if (typeof responseAPI.message === 'string') {
          setMessage(responseAPI.message.split(","));
        } else if (Array.isArray(responseAPI.message)) {
          setMessage(responseAPI.message);
        } else {
          setMessage(Object.values(responseAPI.message));
        }
        return;
      }

      setMessage(['Pet created successfully!']);
    } catch (error) {
      setErrors(['An error occurred while creating the pet.']);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name of the pet"
          name="namePets"
          className="form-control mb-2"
          value={namePets}
          onChange={(event) => setNamePets(event.target.value)}
        />

        <span>Type of pet</span>
        <select className="form-select" onChange={(event) => setPets(event.target.value)}>
          <option value={0}>SELECT OPTION</option>
          <option value={1}>CAT</option>
          <option value={2}>DOG</option>
          <option value={3}>BIRD</option>
        </select>

        <input
          type="number"
          placeholder="Age"
          name="age"
          className="form-control mb-2"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <textarea
          placeholder="Description"
          name="description"
          className="form-control mb-2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="mb-3">
          <label htmlFor="formFile">Upload photo</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="breedSelect">Select Breed</label>
          <select
            id="breedSelect"
            className="form-select"
            onChange={(event) => setPets(event.target.value)}
          >
            {breeds.map(breed => (
              <option key={breed.idBreed} value={breed.idBreed}>
                {breed.nameBreed}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Pet
        </button>
      </form>

      {errors.length > 0 && (
                <div className="alert alert-danger mt-2">
                    <ul className="mb-0">
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

      {message.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {message.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CrearMascota;
