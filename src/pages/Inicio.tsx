import { useEffect, useState } from 'react'
import imgUrl from '../assets/logoRounded.png';

const Inicio = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  //const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3006/api/v1/posts`, {
       // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <section id='info-section' className='my-4 md:flex md:justify-center'>
          <div className='md:w-1/3 flex justify-center items-center mb-4 md:mb-0'>
            <img
              className='img-fluid mx-auto w-52 h-52'
              src={imgUrl}
              alt='logo'
            />
          </div>
          <div className='md:w-2/3'>
            <h1 className='text-2xl font-bold mb-4 text-center'>
              ¡Bienvenido a Perdidos y Encontrados Mascotas!
            </h1>
            <p>
              Estás en el lugar indicado si estás buscando a tu compañero peludo
              perdido o si querés ayudar a reunir a una mascota con su familia.
              En Perdidos y Encontrados Mascotas, estamos dedicados a conectar a
              las mascotas perdidas con sus dueños amorosos. Nuestro objetivo es
              proporcionar un espacio seguro y confiable donde puedas compartir
              información sobre mascotas perdidas y encontradas en tu comunidad.
            </p>
          </div>
        </section>
        <section id='lost-section' className='my-4'>
          <h2 className='text-lg font-bold mb-1'>
            ¿Perdiste a tu preciado amigo de cuatro patas?
          </h2>
          <p>
            No te preocupes, estamos acá para ayudarte. Publicá detalles sobre
            tu mascota perdida, incluyendo una descripción, fotos y la ubicación
            donde fue vista por última vez. Nuestra comunidad está lista para
            ayudarte a difundir la información y reunirte con tu peludo amigo lo
            antes posible.
          </p>
        </section>
        <section id='found-section' className='my-4'>
          <h2 className='text-lg font-bold mb-1'>
            ¿Encontraste una mascota perdida?
          </h2>
          <p>
            Tu acción puede marcar la diferencia en la vida de una familia.
            Publicá los detalles sobre la mascota que encontraste para ayudar a
            reunirla con su hogar. Juntos, podemos hacer que cada mascota
            perdida regrese a casa de manera segura.
          </p>
        </section>
        <section id='care-section' className='my-4'>
          <h2 className='text-lg font-bold mb-1'>Cuidado de mascotas</h2>
          <p>
            Además de servir como plataforma de reunión para mascotas perdidas,
            también ofrecemos información valiosa sobre cuidado de mascotas.
            Mantenete al día con nuestro calendario de vacunación y castraciones
            para garantizar la salud y el bienestar de tu mascota. Creemos en
            educar a nuestra comunidad sobre la importancia de la atención
            adecuada de las mascotas para promover una convivencia armoniosa y
            amorosa entre humanos y animales.
          </p>
        </section>
        <p>
          Sumate a nuestra comunidad de amantes de los animales y juntos
          trabajaremos para garantizar que cada mascota reciba el amor y el
          cuidado que merece. En Perdidos y Encontrados Mascotas, creemos que
          cada mascota perdida tiene un camino de regreso a casa. ¡Sumate y
          ayudemos a que eso suceda!
        </p>
      </div>

      <div className="divCardPet">
        {posts && posts.map(post => (
          <div className="cardDiv" key={post.idPost}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.pets.length > 0 && (
              <div key={post.pets[0].idPet}>
                <p>Nombre de la mascota: {post.pets[0].namePet}</p>
                <p>Descripción: {post.pets[0].description}</p>
                <img
                  src={`./img/${post.pets[0].image}`}
                  width={150}
                  height={150}
                  alt="Imagen de la mascota"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Inicio;
