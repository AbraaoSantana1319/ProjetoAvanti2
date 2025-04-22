import { useState } from "react";
import { FaSearch } from 'react-icons/fa';

export function Input({ placeholder, value, onChange }) {
  return (
  
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className="border rounded p-2 w-full"
        
      />
      
    
  );
}

export function Button({ onClick, children }) {
  return (
    <button 
      onClick={onClick} 
      className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 absolute mt-0.5 mr-0.5 w-[50px] h-[90%]
       end-0 flex justify-center items-center"
      
    >
      {children}
    </button>
  );
}

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchGitHubUser = async () => {
    setError(null);
    setUserData(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
      <div className="flex flex-col items-center p-4 mt-20">
          <div className="w-[800px] p-50 bg-black">
          <img src="./public/Group 1.png" alt="" />
          <div className="flex mb-4 relative">
            <Input
              placeholder="Digite um nome de usuário..." 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />

            <Button onClick={fetchGitHubUser}><FaSearch/></Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {userData && (
            <Card className="w-96 p-4 text-center">
              <CardContent>
                <img src={userData.avatar_url} alt="Avatar" className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
                <p className="text-gray-500">{userData.bio}</p>
                <p className="mt-2">Repos: {userData.public_repos} | Seguidores: {userData.followers}</p>
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline"
                >
                  Ver no GitHub
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    
  );
}
