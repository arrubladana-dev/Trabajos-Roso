// import { Header } from "./components/Header/Header";
import { Perfil } from "./components/Perfil/Perfil";
import { Introduccion } from "./components/Introduccion/Introduccion";
import { Proyectos } from "./components/Proyectos/Proyectos";
import { Estudios } from "./components/Estudios/Estudios";
import { Footer } from "./components/Footer/Footer";
import "./App.css";
export const App = () => {
return (
<div className="app">
    {/* <Header /> */}
    <Perfil
        imagen="/perfil.jpg"
        nombre="Dana Lucia Arrubla"
        rol="Tecnologo en ADSO"
    />
    <Introduccion
        texto="Soy una persona responsable, comprometida y con muchas ganas de seguir aprendiendo y creciendo en el área de desarrollo de software. Me caracterizo por ser organizada, creativa, dedicada y tener facilidad para trabajar en equipo y resolver problemas. Actualmente cuento con conocimientos en desarrollo de aplicaciones web y bases de datos, y me interesa seguir fortaleciendo mis habilidades en programación y nuevas tecnologías. He trabajado en proyectos de software utilizando diferentes herramientas y tecnologías, participando en el desarrollo tanto del frontend como del backend. Me adapto fácilmente a nuevos retos y tengo disposición para aprender, mejorar mis conocimientos y aportar de manera positiva en cada proyecto.
        Lenguajes y tecnologías"
        lenguajes="🟨 JavaScript
🔷 TypeScript
☕ Java
🌐 HTML5
🎨 CSS3 / SCSS
🅰️ Angular
🍃 Spring Boot
🐬 MySQL
🍃 MongoDB
🔐 JWT"
    />
    <Proyectos />
    <Estudios />
    <Footer />
</div>
);
};

