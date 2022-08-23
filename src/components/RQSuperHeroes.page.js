import { useQuery } from 'react-query';
import axios from 'axios';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

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

  const { isLoading, isError, error, refetch, data } = useSuperHeroesData(
    onSuccsess,
    onError
  );

  if (isLoading) return <>Loading</>;

  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
      {/* data from select tranformation */}
      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  );
};
