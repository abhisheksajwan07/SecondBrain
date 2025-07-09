const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-purple-600 mb-6">
          Welcome to SecondBrain
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
