// Loader.tsx

export default function Loader({ title = "Loading..." }) {

  return (
    <div className="loader-overlay">
      <div className="loader-wrapper">
        <div className="loader" />
        <h1>{title}</h1>
      </div>
    </div>
  );
}
 