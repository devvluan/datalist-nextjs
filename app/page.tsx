"use client";
import React, { useState, useEffect } from "react";

/**
 * Componente que renderiza um campo de busca para seleção de repositório do
 * GitHub, listando os repositórios do usuário "devvluan". O componente também
 * renderiza o link do repositório selecionado e uma mensagem caso o
 * repositório seja inexistente.
 *
 * @returns Elemento JSX que renderiza o campo de busca e o link do repositório
 * selecionado.
 */
export default function RepoFilter() {
  const [repos, setRepos] = useState([] as Repo[]);
  const [selectedRepoName, setSelectedRepoName] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/devvluan/repos")
      .then((response) => response.json())
      .then(setRepos)
      .catch((error) => console.error("Erro ao buscar repositórios:", error));
  }, []);

  const foundRepo = repos.find((repo) => repo.name === selectedRepoName);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Selecione um Repositório
        </h1>
        <input
          list="repos"
          value={selectedRepoName}
          onChange={(e) => setSelectedRepoName(e.target.value)}
          placeholder="Digite ou selecione um repositório"
          className="border border-gray-300 p-2 rounded-md w-full mb-4 text-gray-800"
        />
        <datalist id="repos">
          {repos.map((repo) => (
            <option key={repo.id} value={repo.name}>
              {repo.name}
            </option>
          ))}
        </datalist>

        {selectedRepoName && (
          <div>
            <h3 className="text-lg font-semibold mt-4 text-gray-800">
              Repositório Selecionado:
            </h3>
            <p className="text-gray-600">{selectedRepoName}</p>
            {foundRepo ? (
              <a
                href={foundRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                Ver no GitHub
              </a>
            ) : (
              <p className="text-red-500 mt-2">Repositório inexistente</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type Repo = {
  id: number;
  name: string;
  html_url?: string;
};
