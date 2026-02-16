const FullScreenLoader = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-14 h-14 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
      <p className="text-white text-lg font-medium text-center px-6 max-w-sm">
        {message}
      </p>
    </div>
  );
};

export default FullScreenLoader;
