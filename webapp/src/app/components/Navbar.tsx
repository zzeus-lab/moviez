export default function Navbar({
  onSync,
  isSyncing,
}: {
  onSync: () => void;
  isSyncing: boolean;
}) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">Movies App</h1>
        <button
          onClick={onSync}
          className={`px-4 py-2 rounded-lg ${
            isSyncing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white`}
          disabled={isSyncing}
        >
          {isSyncing ? "Syncing..." : "Sync Movies"}
        </button>
      </div>
    </nav>
  );
}
