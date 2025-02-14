import React, { useState, useEffect } from "react";
import { getAllCourses } from "../../services/findAllCourse";
import { findOneCourse } from "../../services/findOneCourse";

interface Course {
  id: string;
  matiere: string;
  classe: string;
  chapitre: string;
}

const Course: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedMatiere, setSelectedMatiere] = useState<string | null>(null);
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{ contenu: string; titre: string } | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      }
    };

    fetchCourses();
  }, []);

  // Filtrer les cours en fonction des sélections
  useEffect(() => {
    let filtered = courses;
    if (selectedMatiere) {
      filtered = filtered.filter((course) => 
        course.matiere.toLowerCase() === selectedMatiere.toLowerCase()
      );
    }
    if (selectedClasse) {
      filtered = filtered.filter((course) => 
        course.classe.toLowerCase() === selectedClasse.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  }, [selectedMatiere, selectedClasse, courses]);

  // Fonction pour récupérer un cours et afficher son contenu
  const handleChapterClick = async (courseId: string) => {
    try {
      const data = await findOneCourse(courseId);
      setSelectedCourse({ contenu: data.course.contenu.html, titre: data.course.chapitre });
    } catch (error) {
      console.error("Erreur lors de la récupération du cours :", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Affichage du contenu du chapitre sélectionné */}
      {selectedCourse ? (
        <div style={courseContentStyle}>
          <h2>{selectedCourse.titre}</h2>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: selectedCourse.contenu }}
          />
          <div style={buttonContainerStyle}>
            <button
              onClick={() => setSelectedCourse(null)} // Retour à la liste
              style={buttonStyle}
            >
              Retour aux chapitres
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Sélection de la matière */}
          <h2>Choisissez une matière</h2>
          <div style={filtersContainerStyle}>
            {["Économie", "Sociologie", "Sciences Politiques"].map((matiere) => (
              <button
                key={matiere}
                onClick={() => setSelectedMatiere(matiere)}
                style={{
                  ...filterButtonStyle,
                  background: selectedMatiere === matiere ? "#f57b42" : "#f5b942",
                }}
              >
                {matiere}
              </button>
            ))}
          </div>

          {/* Sélection de la classe */}
          {selectedMatiere && (
            <>
              <h2>Choisissez une classe</h2>
              <div style={filtersContainerStyle}>
                {["Seconde", "Première", "Terminale"].map((classe) => (
                  <button
                    key={classe}
                    onClick={() => setSelectedClasse(classe)}
                    style={{
                      ...filterButtonStyle,
                      background: selectedClasse === classe ? "#f57b42" : "#f5b942",
                    }}
                  >
                    {classe}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Affichage des chapitres */}
          {selectedClasse && (
            <>
              <h2>Chapitres disponibles</h2>
              <div style={chaptersContainerStyle}>
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => handleChapterClick(course.id)}
                    style={chapterCardStyle}
                  >
                    <h3>{course.chapitre}</h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Course;

const courseContentStyle: React.CSSProperties = {
  // Suppression de la bordure, de l'ombre et du fond pour qu'il s'intègre au background de l'app
  padding: "20px",
  textAlign: "left",
  width: "100vw", // Prend toute la largeur de l'écran
  maxWidth: "90vw", // Pour éviter un débordement sur grands écrans
  margin: "auto",
  fontSize: "18px",
  lineHeight: "1.6",
  maxHeight: "calc(100vh - 100px)", // Ajuste la hauteur pour respecter l'espace du header
  overflowY: "auto", // Scroll activé uniquement si nécessaire
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // Place le bouton en bas
  background: "transparent", // Fond transparent pour ne pas contraster avec le background de l'app
  border: "none", // Pas de bordure
  boxShadow: "none", // Pas d'ombre portée
};


const buttonContainerStyle: React.CSSProperties = {
  position: "sticky",
  bottom: "0px",
  padding: "10px",
  textAlign: "center",
  width: "100%",
  background: "transparent", // Fond transparent pour ne pas contraster avec le background de l'app
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 15px",
  background: "#f57b42",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "16px",
  color: "#fff",
  marginBottom: "10px",
};

const filtersContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "20px",
};

const filterButtonStyle: React.CSSProperties = {
  padding: "10px 15px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "16px",
};

const chaptersContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  justifyContent: "center",
  marginTop: "20px",
};

const chapterCardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "10px",
  background: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};
