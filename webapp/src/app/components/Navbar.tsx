import { FaSync } from "react-icons/fa";

export default function Navbar({
  onSync,
  isSyncing,
}: {
  onSync: () => void;
  isSyncing: boolean;
}) {
  return (
    <nav className=" p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎬 Movies App</h1>
      <button
        onClick={onSync}
        className={`flex items-center bg-purple-800 text-white py-2 px-4 rounded transition ${
          isSyncing ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
        }`}
        disabled={isSyncing}
      >
        {isSyncing ? (
          <span className="loader">Syncing...</span>
        ) : (
          <>
            <FaSync className="mr-2" />
            Sync Movies
          </>
        )}
      </button>
    </nav>
  );
}
