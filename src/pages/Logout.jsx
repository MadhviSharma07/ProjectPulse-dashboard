import { useLogout } from "../context/LogoutContext";

function Logout() {
  const { showLogout, setShowLogout } = useLogout();

  if (!showLogout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔹 Background Blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setShowLogout(false)}
      />

      {/* 🔹 Modal */}
      <div className="relative bg-white rounded-2xl p-6 w-[350px] shadow-xl text-center z-50">

        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-xl">
          ⚠️
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          Are you sure you want to logout?
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          You will be logged out from all pages.
        </p>

        <div className="flex justify-center gap-4 mt-6">

          <button
            onClick={() => setShowLogout(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Logout;