import { PropagateLoader } from "react-spinners";

export default function ProcessingLoader() {
  return (
    <div
      className="model__container__bigger"
      style={{ justifyContent: "center", zIndex: "9999999" }}
    >
      <PropagateLoader
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        //   color="#2a5e59"
        color="white"
      />
    </div>
  );
}
