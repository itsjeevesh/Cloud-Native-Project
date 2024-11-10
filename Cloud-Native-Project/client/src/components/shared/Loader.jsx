/**
 * Loader component renders a loading spinner with customizable size.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.size - The size of the loader.
 * @param {string} props.color - The color of the loader.
 * @returns {JSX.Element} The Loader component.
 */
const Loader = ({ size, color }) => {
  return (
    <div
      className="loader"
      style={{
        width: size,
        textAlign: 'center',
        height: size,
        borderWidth: '5px',
        borderColor: color || "#809848",
        borderStyle: 'solid',
        borderRadius: '50%'
      }}
    ></div>
  );
};

export default Loader;
