import React, { useState } from 'react';

export const CrearMascota: React.FC = () => {
  const [namePet, setNamePet] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [pet, setPet] = useState('');
  const [description, setDescription] = useState('');
  const [postIdFk, setPostIdFk] = useState('1');
  
  const [file, setFile] = useState(null);

  const handleFileChange = (event: { target: { files: any; }; }) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('namePet', namePet);
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('pet', pet);
    formData.append('description', description);
    formData.append('postIdFk', postIdFk);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:3006/api/v1/pets/create', {
        method: 'POST',
        body: formData,
      
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoidXNlciIsImlkVXNlciI6MiwiaWF0IjoxNzE2NTYwNzg2LCJleHAiOjE3MTY1Njc5ODZ9.gcqp7ieZFnH0s2jkOTbSi_FNMg6Wyj312Epr0DCOZ_Q`,
        },

      });
console.log(response);

      if (!response.ok) {
        throw new Error('Error al crear la mascota');
      }

      const data = await response.json();
      console.log('Mascota creada:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la mascota"
        value={namePet}
        onChange={(e) => setNamePet(e.target.value)}
      />
      <input
        type="number"
        placeholder="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
            <input
        type="number"
        placeholder=""
        value={postIdFk}
        onChange={(e) => setPostIdFk(e.target.value)}
      />
      <input
        type="text"
        placeholder="Raza"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo de mascota"
        value={pet}
        onChange={(e) => setPet(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input type="file" onChange={handleFileChange} />
    
      <button
           type="submit"
           className="btn btn-primary"
         >
           crear mascota
         </button>
    </form>
  );
};
