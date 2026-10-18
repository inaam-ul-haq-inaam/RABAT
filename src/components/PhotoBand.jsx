/** The full-bleed photo bands that alternate with the home-page sections. */
export default function PhotoBand({ id, image }) {
  return (
    <section
      className="photo-band"
      id={id}
      aria-hidden="true"
      style={{ backgroundImage: "url('" + image + "')" }}
    />
  );
}
