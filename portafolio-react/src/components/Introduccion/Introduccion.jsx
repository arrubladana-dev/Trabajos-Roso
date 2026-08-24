import "./Introduccion.css";

export const Introduccion = (props) => {
    return (
        <section id="introduccion" className="introduccion">
            <h2>Sobre mí</h2>
            <p className="introduccion__texto">{props.texto}</p>
            <div className="lenguajes">
                <p className="textLenguage">{props.lenguajes} </p>
            </div>
        </section>
);
};
