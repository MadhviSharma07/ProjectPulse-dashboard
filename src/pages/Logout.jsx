import { useLogout } from "../context/LogoutContext";
import Button from "../Other components/Button";
import { FiLogOut } from "react-icons/fi";

function Logout() {
  const { showLogout, setShowLogout } = useLogout();

  if (!showLogout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* 🔹 Background Blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm "
        onClick={() => setShowLogout(false)}
      />

      {/* 🔹 Modal */}
      <div className="relative w-[400px] rounded-3xl bg-white6 dark:bg-zinc-800  border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300 shadow-2xl p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-6">
          <FiLogOut className="text-2xl text-purple-600 dark:text-purple-400" />
        </div>

        {/* Content */}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Logout
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Are you sure you want to sign out of your account? Any unsaved changes
          may be lost.
        </p>

        {/* Divider */}
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-3" />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            content="Cancel"
            variant="secondary"
            onClick={() => setShowLogout(false)}
          />

          <Button
            content="Sign Out"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default Logout;
