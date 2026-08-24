import { useState } from "react";
import "./Proyectos.css";
import { TarjetaProyecto } from "./TarjetaProyecto";

export const Proyectos = () => {

    const proyectos = [
        {
            imagen: "/rick.jpg",
            titulo: "Rick y Morty",
            descripcion: "Proyecto de consumo de api de Rick y Morty"
        },
        {
            imagen: "/pokemon.jpg",
            titulo: "Pokemon",
            descripcion: "Proyecto de consumo de api con angular"
        },
        {
            imagen: "/formulario.jpg",
            titulo: "Formulario",
            descripcion: "Formulario "
        }
    ];

    const [indiceActual, setIndiceActual] = useState(0);

    const siguiente = () => {
        setIndiceActual((indiceActual + 1) % proyectos.length);
    };

    const anterior = () => {
        setIndiceActual(
            (indiceActual - 1 + proyectos.length) % proyectos.length
        );
    };

    return (
        <section id="proyectos" className="proyectos">

            <h2>Proyectos</h2>

            <div className="carrusel">

                <button
                    className="carrusel__boton carrusel__boton--anterior"
                    onClick={anterior}
                >
                    ❮
                </button>

                <div className="carrusel__contenedor">

                    <TarjetaProyecto
                        imagen={proyectos[indiceActual].imagen}
                        titulo={proyectos[indiceActual].titulo}
                        descripcion={proyectos[indiceActual].descripcion}
                    />

                </div>

                <button
                    className="carrusel__boton carrusel__boton--siguiente"
                    onClick={siguiente}
                >
                    ❯
                </button>

            </div>

            <div className="carrusel__indicadores">

                {proyectos.map((_, indice) => (
                    <button
                        key={indice}
                        className={
                            indice === indiceActual
                                ? "indicador indicador--activo"
                                : "indicador"
                        }
                        onClick={() => setIndiceActual(indice)}
                    />
                ))}

            </div>

        </section>
    );
};