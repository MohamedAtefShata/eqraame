import "../Styles/loading.css";

export default function LoadingPage() {
  return (
    <div id="wrapper">
      <div className="profile-main-loader">
        <div className="loader">
          <svg className="circular-loader" viewBox="25 25 50 50">
            <circle
              className="loader-path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#70c542"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
