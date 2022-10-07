import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  useAddSuperHeroesData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';
import { useState } from 'react';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const onSuccsess = (data) => {
  console.log('Success', data);
};

const onError = (error) => {
  console.log('Error', error);
};
export const RQSuperHeroesPage = () => {
  // const { isLoading, data, isError, error, refetch } = useQuery(
  //   'super-heroes',
  //   fetchSuperHeroes,
  //   {
  //     // enabled: false,
  //     // cacheTime,
  //     // staleTime
  //     // refetchOnMount: true,
  //     // refetchOnWindowFocus:true,
  //     // refetchIntervalInBackground,
  //     // refetchInterval: 1000,
  //     onSuccess: onSuccsess,
  //     onError: onError,
  //     select: (data) => {
  //       //Used to transform data as per requirement
  //       const heroName = data.data.map((hero) => hero.name);
  //       return heroName;
  //     },
  //   }
  // );
  const [name, setName] = useState('');
  const [alterEgo, setAlter] = useState('');
  const { data: mutationData, mutate } = useAddSuperHeroesData();

  const { isLoading, isError, error, refetch, data } = useSuperHeroesData(
    onSuccsess,
    onError
  );

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    mutate(hero);
  };

  if (isLoading) return <>Loading</>;

  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>RQ Super Heroes Page</h2>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlter(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* data from select tranformation */}
      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  );
};
