import React, { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

// Enregistrement d'une liste de polices personnalisées pour ReactQuill
const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "serif", "monospace", "arial", "times-new-roman"];
Quill.register(Font, true);

interface EditCourseContentProps {
  courseId: string;
  initialContent?: string;
  onSave: (content: string) => void;
  onGoBack: () => void;
  isLoading?: boolean;
}

const EditCourseContent: React.FC<EditCourseContentProps> = ({
  courseId,
  initialContent = "",
  onSave,
  onGoBack,
  isLoading = false,
}) => {
  const [editorContent, setEditorContent] = useState<string>(initialContent);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Fonction de nettoyage du HTML pour éviter les espaces indésirables
  const cleanHtml = (html: string) => {
    return html
      .replace(/<p><br><\/p>/g, "") // Supprime les paragraphes vides
      .replace(/<br\s*\/?>\s*<br\s*\/?>/g, "<br>") // Remplace les doubles <br> par un seul
      .replace(/\n/g, "") // Supprime les sauts de ligne
      .trim(); // Supprime les espaces inutiles
  };

  // Basculer entre prévisualisation et édition en nettoyant le HTML
  const togglePreview = () => {
    if (isPreview) {
      setEditorContent(cleanHtml(editorContent)); // Nettoie le HTML avant de revenir en mode édition
    }
    setIsPreview(!isPreview);
  };

  // Configuration de la barre d'outils incluant le choix de la police
  const modules = {
    toolbar: [
      [{ font: Font.whitelist }], // menu déroulant pour la police
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  const courseContentStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    width: "100%", // Prend toute la largeur disponible
    maxWidth: "90vw", // S'adapte à la taille de l'écran
    margin: "auto",
    fontSize: "18px",
    lineHeight: "1.6",
    maxHeight: "55vh", // Réduction de la hauteur pour afficher les boutons
    overflowY: "auto",
  };

  const editorContainerStyle: React.CSSProperties = {
    marginTop: "15px",
    width: "100%", // Prend toute la largeur disponible
    maxWidth: "90vw", // S'adapte à l'écran
    maxHeight: "55vh", // Ajustement de la hauteur pour voir les boutons
    overflowY: "auto",
    margin: "auto",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    width: "100%",
    maxWidth: "95vw", // Évite d'être trop large sur petits écrans
    textAlign: "center",
  };

  const buttonsContainerStyle: React.CSSProperties = {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    width: "100%", // S'assurer que les boutons prennent la place restante
    position: "relative", // Permet d'éviter qu'ils ne disparaissent
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "rgb(245, 185, 66)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "green",
  };

  return (
    <div style={containerStyle}>
      <h2>Édition du contenu du cours</h2>
      <div style={buttonsContainerStyle}>
        <button onClick={togglePreview} style={buttonStyle}>
          {isPreview ? "Retour à l'édition" : "Prévisualiser"}
        </button>
      </div>
      {isPreview ? (
        <div style={courseContentStyle}>
          {/* Pour que les images ne dépassent pas du conteneur */}
          <style>
            {`
              .preview-content img {
                max-width: 100%;
                height: auto;
              }
            `}
          </style>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(cleanHtml(editorContent)), // Nettoie avant d'afficher
            }}
          />
        </div>
      ) : (
        <div style={editorContainerStyle} ref={editorContainerRef}>
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            formats={formats}
            style={{ marginTop: "15px" }}
          />
        </div>
      )}
      <div style={buttonsContainerStyle}>
        <button onClick={() => onSave(editorContent)} style={submitButtonStyle} disabled={isLoading}>
          {isLoading ? "Loading..." : "Valider le contenu"}
        </button>
        <button onClick={onGoBack} style={buttonStyle}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default EditCourseContent;
