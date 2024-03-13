import { PropagateLoader } from "react-spinners";

export default function ProcessingLoader() {
  return (
    <div className="model__container__bigger">
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
